import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = 'http://127.0.0.1:4173';
const stamp = '20260723_142302';
const outRoot = path.resolve('outputs/frontend_ux_ui_current_state_audit/20260723_142302');
const viewports = [
  { key: '375', width: 375, height: 812 },
  { key: '768', width: 768, height: 1024 },
  { key: '1440', width: 1440, height: 900 },
  { key: '1920', width: 1920, height: 1080 },
];

const raw = {
  capturedAt: new Date().toISOString(),
  baseURL,
  runtime: 'production preview',
  viewports: {},
  flows: [],
  consoleErrors: [],
  pageErrors: [],
  failedRequests: [],
};

function slug(value) {
  return value
    .replace(/^\//, '')
    .replaceAll('/', '-')
    .replaceAll('#', 'hash-')
    .replaceAll('?', '-')
    .replaceAll('&', '-')
    .replaceAll('=', '-') || 'story';
}

async function screenshot(page, viewportKey, route, state) {
  const filename = `${slug(route)}_${viewportKey}x${page.viewportSize().height}_${state}_${stamp}.png`;
  const target = path.join(outRoot, 'screenshots', viewportKey, filename);
  await page.screenshot({ path: target, fullPage: false, animations: 'disabled' });
  return path.relative(outRoot, target);
}

async function routeSnapshot(page, route, label, viewportKey, options = {}) {
  const started = performance.now();
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  if (options.target) {
    const target = page.locator(options.target).first();
    if (await target.count()) await target.scrollIntoViewIfNeeded();
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const file = await screenshot(page, viewportKey, route, label);
  const dom = await page.evaluate(() => {
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((element) => ({
      level: Number(element.tagName.slice(1)),
      text: element.textContent?.trim().replace(/\s+/g, ' ') ?? '',
    }));
    const landmarks = [...document.querySelectorAll('main,header,nav,footer,aside,[role="main"],[role="navigation"],[role="contentinfo"],[role="banner"]')]
      .map((element) => ({ tag: element.tagName.toLowerCase(), role: element.getAttribute('role'), label: element.getAttribute('aria-label') }));
    return {
      title: document.title,
      url: location.pathname + location.search + location.hash,
      headings,
      landmarks,
      bodyTextPrefix: document.body.innerText.slice(0, 500),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyHeight: document.body.scrollHeight,
      svgCount: document.querySelectorAll('svg').length,
      svgElementCount: [...document.querySelectorAll('svg *')].length,
      buttonCount: document.querySelectorAll('button').length,
      linkCount: document.querySelectorAll('a[href]').length,
      dialogCount: document.querySelectorAll('[role="dialog"]').length,
      mockLabels: [...document.querySelectorAll('body *')].filter((el) => /MOCK|Fixture/i.test(el.textContent ?? '') && el.children.length === 0).map((el) => el.textContent?.trim()).slice(0, 30),
    };
  });
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const timing = await page.evaluate(() => ({
    navigation: performance.getEntriesByType('navigation').map((entry) => ({
      duration: entry.duration,
      domContentLoaded: entry.domContentLoadedEventEnd,
      loadEventEnd: entry.loadEventEnd,
      transferSize: entry.transferSize,
      decodedBodySize: entry.decodedBodySize,
    })),
    paints: performance.getEntriesByType('paint').map((entry) => ({ name: entry.name, startTime: entry.startTime })),
  }));
  return {
    route,
    label,
    httpStatus: response?.status() ?? null,
    wallMs: Math.round(performance.now() - started),
    screenshot: file,
    dom,
    axe: axe.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      nodes: violation.nodes.length,
      targets: violation.nodes.map((node) => node.target),
    })),
    timing,
  };
}

async function measureAnswers(page, viewportKey) {
  await page.goto(`${baseURL}/#answers`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const chapter = page.locator('#answers');
  await chapter.scrollIntoViewIfNeeded();
  const base = await screenshot(page, viewportKey, '/#answers', 'default');

  const status = page.getByLabel('처리상태 필터');
  await status.selectOption('complete');
  const statusShot = await screenshot(page, viewportKey, '/#answers', 'status-complete');

  await status.selectOption('all');
  const type = page.getByLabel('답변유형 필터');
  await type.selectOption('A1');
  const typeShot = await screenshot(page, viewportKey, '/#answers', 'type-A1');

  await type.selectOption('all');
  const node = page.locator('#answers svg[viewBox] g.cursor-pointer').first();
  await node.hover();
  const hoverShot = await screenshot(page, viewportKey, '/#answers', 'node-hover');
  const nodeTabIndex = await node.getAttribute('tabindex');
  const nodeRole = await node.getAttribute('role');
  const nodeLabel = await node.getAttribute('aria-label');
  await node.evaluate((element) => element.focus());
  const focusedElement = await page.evaluate(() => ({
    tag: document.activeElement?.tagName ?? null,
    role: document.activeElement?.getAttribute('role') ?? null,
    label: document.activeElement?.getAttribute('aria-label') ?? null,
  }));
  const focusShot = await screenshot(page, viewportKey, '/#answers', 'node-focus-unavailable');

  await node.click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  const drawerShot = await screenshot(page, viewportKey, '/#answers', 'node-click-evidence-drawer');
  const drawerState = await page.evaluate(() => ({
    url: location.pathname + location.search + location.hash,
    rootInert: document.getElementById('root')?.inert ?? false,
    rootAriaHidden: document.getElementById('root')?.getAttribute('aria-hidden'),
    bodyOverflow: document.body.style.overflow,
    activeElement: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim(),
  }));
  await page.goBack({ waitUntil: 'networkidle' });
  const backState = await page.evaluate(() => ({
    url: location.pathname + location.search + location.hash,
    dialogCount: document.querySelectorAll('[role="dialog"]').length,
    activeElement: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim(),
    scrollY: window.scrollY,
  }));

  const resetButton = page.getByRole('button', { name: /초기화/ });
  const resetObstruction = await resetButton.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const point = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    const hit = document.elementFromPoint(point.x, point.y);
    return {
      point,
      buttonBox: box.toJSON(),
      hitTag: hit?.tagName ?? null,
      hitText: hit?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 160) ?? null,
      hitWithinButton: Boolean(hit && element.contains(hit)),
    };
  });
  await resetButton.click({ force: true });
  const resetShot = await screenshot(page, viewportKey, '/#answers', 'reset');
  await page.getByText('[Deterministic Atlas Fixture]', { exact: true }).scrollIntoViewIfNeeded();
  const legendShot = await screenshot(page, viewportKey, '/#answers', 'legend');

  const measures = await page.evaluate(() => {
    const chapter = document.getElementById('answers');
    const plot = chapter?.querySelector('div.relative.bg-\\[var\\(--color-surface\\)\\]');
    const svg = chapter?.querySelector('svg[viewBox="0 0 100 100"]');
    const groups = [...(svg?.querySelectorAll('g.cursor-pointer') ?? [])];
    const nodes = groups.map((group) => {
      const circles = group.querySelectorAll('circle');
      const mark = circles[0];
      const box = mark?.getBoundingClientRect();
      return box ? { x: box.x + box.width / 2, y: box.y + box.height / 2, r: box.width / 2, width: box.width, height: box.height } : null;
    }).filter(Boolean);
    let minDistance = null;
    let maxOverlap = 0;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        minDistance = minDistance === null ? d : Math.min(minDistance, d);
        maxOverlap = Math.max(maxOverlap, nodes[i].r + nodes[j].r - d);
      }
    }
    const controls = chapter?.querySelector('select')?.closest('div.bg-\\[var\\(--color-surface\\)\\]');
    const legend = [...(chapter?.querySelectorAll('div') ?? [])].find((el) => el.textContent?.includes('[Deterministic Atlas Fixture]'));
    return {
      chapterBox: chapter?.getBoundingClientRect().toJSON(),
      plotBox: plot?.getBoundingClientRect().toJSON(),
      viewBox: svg?.getAttribute('viewBox'),
      preserveAspectRatio: svg?.getAttribute('preserveAspectRatio'),
      svgBox: svg?.getBoundingClientRect().toJSON(),
      nodeCount: groups.length,
      circleCount: svg?.querySelectorAll('circle').length,
      minCenterDistancePx: minDistance,
      maxOverlapPx: maxOverlap,
      largestRadiusPx: nodes.length ? Math.max(...nodes.map((item) => item.r)) : null,
      smallestMarkDiameterPx: nodes.length ? Math.min(...nodes.map((item) => item.width)) : null,
      controlsBox: controls?.getBoundingClientRect().toJSON(),
      legendBox: legend?.getBoundingClientRect().toJSON(),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      hasSvgTitle: Boolean(svg?.querySelector('title')),
      hasSvgDesc: Boolean(svg?.querySelector('desc')),
      svgAriaLabel: svg?.getAttribute('aria-label'),
      svgRole: svg?.getAttribute('role'),
      domMirrorCandidates: document.querySelectorAll('#answers table, #answers ul[aria-label], #answers [role="listbox"], #answers [aria-live]').length,
      focusableNodeCount: groups.filter((group) => group.matches('[tabindex],button,a[href],[role="button"]')).length,
    };
  });

  return {
    screenshots: { base, statusShot, typeShot, hoverShot, focusShot, drawerShot, resetShot, legendShot },
    nodeAccessibility: { nodeTabIndex, nodeRole, nodeLabel, focusedElement },
    drawerState,
    backState,
    resetObstruction,
    measures,
  };
}

async function flowChecks(page) {
  const flows = [];
  const started = performance.now();
  await page.goto(`${baseURL}/#answers`, { waitUntil: 'networkidle' });
  const atlasCTA = await page.getByRole('link', { name: /전체 지도|답변행태 지도|Atlas/i }).count();
  const atlasButtons = await page.getByRole('button', { name: /전체 지도|답변행태 지도|Atlas/i }).count();
  flows.push({ id: 'story_to_answers', result: 'CONFIRMED', elapsedMs: Math.round(performance.now() - started), url: await page.evaluate(() => location.href), atlasCTA, atlasButtons });

  await page.goto(`${baseURL}/evidence/ev-101`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  flows.push({ id: 'evidence_direct_refresh', result: await page.getByTestId('evidence-direct-page').isVisible() ? 'CONFIRMED' : 'CONTRADICTED', url: await page.evaluate(() => location.href) });

  await page.goto(`${baseURL}/case/case-01`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  flows.push({ id: 'case_direct_refresh', result: await page.getByTestId('case-direct-page').isVisible() ? 'CONFIRMED' : 'CONTRADICTED', url: await page.evaluate(() => location.href) });

  await page.goto(`${baseURL}/#answers`, { waitUntil: 'networkidle' });
  await page.getByLabel('처리상태 필터').selectOption('complete');
  const beforeReload = await page.getByLabel('처리상태 필터').inputValue();
  await page.reload({ waitUntil: 'networkidle' });
  const afterReload = await page.getByLabel('처리상태 필터').inputValue();
  flows.push({ id: 'answers_filter_reload_restore', result: beforeReload === afterReload ? 'CONFIRMED' : 'CONTRADICTED', beforeReload, afterReload, url: await page.evaluate(() => location.href) });

  await page.goto(`${baseURL}/atlas`, { waitUntil: 'networkidle' });
  flows.push({ id: 'atlas_access', result: await page.getByTestId('not-found-page').isVisible() ? 'NOT_IMPLEMENTED_404' : 'OTHER', bodyPrefix: (await page.locator('body').innerText()).slice(0, 200) });
  return flows;
}

const browser = await chromium.launch({ headless: true });
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('console', (message) => { if (message.type() === 'error') raw.consoleErrors.push({ viewport: viewport.key, text: message.text(), url: page.url() }); });
  page.on('pageerror', (error) => raw.pageErrors.push({ viewport: viewport.key, text: error.message, url: page.url() }));
  page.on('requestfailed', (request) => raw.failedRequests.push({ viewport: viewport.key, url: request.url(), method: request.method(), error: request.failure()?.errorText }));

  const routes = [
    { route: '/', label: 'top' },
    { route: '/#answers', label: 'answers-entry', target: '#answers' },
    { route: '/method', label: 'default' },
    { route: '/data', label: 'default' },
    { route: '/about', label: 'default' },
    { route: '/evidence/ev-101', label: 'direct-page' },
    { route: '/case/case-01', label: 'direct-page' },
    { route: '/does-not-exist', label: '404' },
    { route: '/atlas', label: 'access-result' },
    { route: '/dev/foundations', label: 'production-access-result' },
  ];
  const routeResults = [];
  for (const item of routes) routeResults.push(await routeSnapshot(page, item.route, item.label, viewport.key, item));

  await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '첫 증거 원문 ev-101 확인하기' }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  routeResults.push({ route: '/evidence/ev-101', label: 'drawer-open', screenshot: await screenshot(page, viewport.key, '/evidence/ev-101', 'drawer-open') });
  await page.goBack({ waitUntil: 'networkidle' });

  await page.goto(`${baseURL}/#cases`, { waitUntil: 'networkidle' });
  const caseButton = page.getByRole('button', { name: '사례 심층 분석 & 원문' }).first();
  if (await caseButton.count()) {
    await caseButton.click();
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    if (await page.getByRole('dialog').count()) routeResults.push({ route: '/case/case-01', label: 'drawer-open', screenshot: await screenshot(page, viewport.key, '/case/case-01', 'drawer-open') });
    if (await page.getByRole('dialog').count()) await page.goBack({ waitUntil: 'networkidle' });
  }

  raw.viewports[viewport.key] = {
    viewport,
    routes: routeResults,
    answers: await measureAnswers(page, viewport.key),
  };
  if (viewport.key === '1440') raw.flows = await flowChecks(page);
  await context.close();
}
await browser.close();
await fs.writeFile(path.join(outRoot, 'BROWSER_AUDIT_RAW.json'), JSON.stringify(raw, null, 2));
console.log(JSON.stringify({ outRoot, screenshots: Object.values(raw.viewports).reduce((sum, item) => sum + item.routes.filter((route) => route.screenshot).length + Object.keys(item.answers.screenshots).length, 0), flows: raw.flows }, null, 2));
