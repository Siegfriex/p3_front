import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.PROLOGUE_AUDIT_URL ?? 'http://127.0.0.1:3001/';
const viewports = [
  { name: 'compact', width: 320, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
];

const browser = await chromium.launch({ headless: true });
const results = {
  auditVersion: 'PROLOGUE_REACT_UX_METRICS_1.0.0',
  measuredAt: new Date().toISOString(),
  baseURL,
  viewports: {},
};

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__prologueVitals = { cls: 0, lcp: 0, maxEventDuration: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__prologueVitals.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__prologueVitals.cls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__prologueVitals.maxEventDuration = Math.max(
            window.__prologueVitals.maxEventDuration,
            entry.duration ?? 0,
          );
        }
      }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch {
      // Unsupported observers remain zero and are labeled as lab-only below.
    }
  });

  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);

  const baseline = await page.evaluate(() => {
    const get = (selector) => document.querySelector(selector);
    const rect = (element) => element?.getBoundingClientRect() ?? null;
    const areaRatio = (element, top, bottom) => {
      const r = rect(element);
      if (!r || r.width <= 0 || r.height <= 0) return 0;
      const visibleWidth = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
      const visibleHeight = Math.max(0, Math.min(r.bottom, bottom) - Math.max(r.top, top));
      return Number(((visibleWidth * visibleHeight) / (r.width * r.height)).toFixed(3));
    };
    const parseColor = (value) => {
      if (value.startsWith('#')) {
        let hex = value.slice(1);
        if (hex.length === 3) hex = hex.split('').map((part) => part + part).join('');
        return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
      }
      return value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
    };
    const luminance = (value) => {
      const [r, g, b] = parseColor(value).map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (foreground, background) => {
      const foregroundLuminance = luminance(foreground);
      const backgroundLuminance = luminance(background);
      return Number((
        (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
        / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
      ).toFixed(2));
    };

    const header = get('body > #root header');
    const footerRail = get('body > #root footer.fixed');
    const usableTop = rect(header)?.bottom ?? 0;
    const usableBottom = rect(footerRail)?.top ?? innerHeight;
    const nextAction = get('#prologue .page-frame footer button');
    const evidenceAction = get('#prologue button[aria-label*="첫 승인 증거"]');
    const identityImage = get('#prologue img');
    const paper = getComputedStyle(document.documentElement).getPropertyValue('--color-paper').trim();
    const nextStyle = getComputedStyle(nextAction);
    const nextRect = rect(nextAction);
    const animatedIcon = nextAction?.querySelector('svg');
    const iconStyle = animatedIcon ? getComputedStyle(animatedIcon) : null;

    const evidenceSvg = document.querySelector('#prologue .page-frame > div > div[aria-hidden="true"] svg');
    const svgRect = rect(evidenceSvg);
    const lineX = svgRect ? svgRect.left + svgRect.width * 0.12 : -1;
    const lineTop = svgRect?.top ?? -1;
    const lineBottom = svgRect ? svgRect.top + svgRect.height * 0.8 : -1;
    const lineIntersections = Array.from(document.querySelectorAll('#prologue h1, #prologue h2, #prologue p, #prologue button'))
      .map((element) => ({ element, box: rect(element) }))
      .filter(({ box }) => box && lineX >= box.left && lineX <= box.right && lineBottom >= box.top && lineTop <= box.bottom)
      .map(({ element }) => ({
        tag: element.tagName.toLowerCase(),
        text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 90) ?? '',
      }));

    const imageRect = rect(identityImage);
    const imageStyle = identityImage ? getComputedStyle(identityImage) : null;
    const widthScale = identityImage && imageRect ? imageRect.width / Math.max(identityImage.naturalWidth, 1) : 0;
    const heightScale = identityImage && imageRect ? imageRect.height / Math.max(identityImage.naturalHeight, 1) : 0;
    const imageUpscale = identityImage && imageRect
      ? Number((imageStyle?.objectFit === 'contain'
        ? Math.min(widthScale, heightScale)
        : Math.max(widthScale, heightScale)).toFixed(2))
      : null;

    return {
      viewport: { width: innerWidth, height: innerHeight, usableTop, usableBottom },
      firstFoldVisibility: {
        headline: areaRatio(get('#prologue h1'), usableTop, usableBottom),
        subheadline: areaRatio(get('#prologue h2'), usableTop, usableBottom),
        evidenceAction: areaRatio(evidenceAction, usableTop, usableBottom),
        nextChapterAction: areaRatio(nextAction, usableTop, usableBottom),
        identityImage: areaRatio(identityImage, usableTop, usableBottom),
      },
      action: {
        tag: nextAction?.tagName.toLowerCase() ?? null,
        hasHref: nextAction?.hasAttribute('href') ?? false,
        visibleText: nextAction?.textContent?.trim().replace(/\s+/g, ' ') ?? '',
        accessibleName: nextAction?.getAttribute('aria-label') ?? '',
        destinationNamedInVisibleText: /CHAPTER\s*01|요구한 것|얼마나 조치|기사 시작|다음 장/.test(nextAction?.textContent ?? ''),
        width: Number(nextRect?.width.toFixed(2) ?? 0),
        height: Number(nextRect?.height.toFixed(2) ?? 0),
        wcag24TargetPass: (nextRect?.width ?? 0) >= 24 && (nextRect?.height ?? 0) >= 24,
        internal44TargetPass: (nextRect?.width ?? 0) >= 44 && (nextRect?.height ?? 0) >= 44,
        fontSize: Number.parseFloat(nextStyle.fontSize),
        textContrast: contrast(nextStyle.color, paper),
        perpetualMotion: iconStyle?.animationIterationCount === 'infinite',
        animationName: iconStyle?.animationName ?? 'none',
      },
      composition: {
        evidenceLineTextIntersectionCount: lineIntersections.length,
        evidenceLineIntersections: lineIntersections,
        evidenceLineGeometry: svgRect ? {
          x: Number(lineX.toFixed(2)),
          top: Number(lineTop.toFixed(2)),
          bottom: Number(lineBottom.toFixed(2)),
        } : null,
        horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        prologueHeightPx: Number(rect(get('#prologue'))?.height.toFixed(2) ?? 0),
        prologueViewportRatio: Number(((rect(get('#prologue'))?.height ?? 0) / innerHeight).toFixed(2)),
        fixedFooterHeightPx: Number(rect(footerRail)?.height.toFixed(2) ?? 0),
        mainPaddingBottomPx: Number.parseFloat(getComputedStyle(get('main')).paddingBottom),
      },
      identityAsset: {
        naturalWidth: identityImage?.naturalWidth ?? 0,
        naturalHeight: identityImage?.naturalHeight ?? 0,
        renderedWidth: Number(imageRect?.width.toFixed(2) ?? 0),
        renderedHeight: Number(imageRect?.height.toFixed(2) ?? 0),
        objectFit: imageStyle?.objectFit ?? null,
        maxUpscaleFactor: imageUpscale,
      },
      vitalsLab: { ...window.__prologueVitals },
    };
  });

  const axe = await new AxeBuilder({ page }).analyze();
  const blockingAxe = axe.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact));

  const nextAction = page.locator('#prologue .page-frame footer button');
  await nextAction.scrollIntoViewIfNeeded();
  const preClickScrollY = await page.evaluate(() => scrollY);
  const clickStart = Date.now();
  await nextAction.click();
  await page.waitForFunction(() => location.hash === '#scale');
  const hashUpdateMs = Date.now() - clickStart;
  await page.waitForTimeout(900);

  const interaction = await page.evaluate(() => {
    const scale = document.querySelector('#scale');
    const scaleRect = scale?.getBoundingClientRect();
    const heading = scale?.querySelector('h1, h2, h3');
    const headingRect = heading?.getBoundingClientRect();
    const focus = document.activeElement;
    const footerText = Array.from(document.querySelectorAll('footer.fixed span'))
      .map((element) => element.textContent?.trim())
      .find((text) => text?.startsWith('CHAPTER:')) ?? '';
    return {
      url: location.href,
      hash: location.hash,
      scrollY,
      scaleTopPx: Number(scaleRect?.top.toFixed(2) ?? 0),
      firstHeadingTopPx: Number(headingRect?.top.toFixed(2) ?? 0),
      landingWhitespacePx: Number(((headingRect?.top ?? 0) - (scaleRect?.top ?? 0)).toFixed(2)),
      focusInDestination: Boolean(scale?.contains(focus)),
      focusedElement: focus?.getAttribute('aria-label') ?? focus?.textContent?.trim().slice(0, 80) ?? focus?.tagName,
      footerChapterText: footerText,
      footerUpdated: footerText.includes('SCALE'),
      maxObservedEventDurationMs: window.__prologueVitals.maxEventDuration,
    };
  });

  await page.goBack({ waitUntil: 'domcontentloaded', timeout: 5_000 });
  await page.waitForTimeout(350);
  const backNavigation = await page.evaluate((expectedY) => ({
    hash: location.hash,
    scrollY,
    restoredWithin100Px: Math.abs(scrollY - expectedY) <= 100,
  }), preClickScrollY);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  const reducedMotion = await page.evaluate(() => {
    const action = document.querySelector('#prologue .page-frame footer button');
    const icon = action?.querySelector('svg');
    return {
      mediaMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      iconAnimationName: icon ? getComputedStyle(icon).animationName : 'none',
      iconAnimationIterationCount: icon ? getComputedStyle(icon).animationIterationCount : '0',
    };
  });

  results.viewports[viewport.name] = {
    ...baseline,
    axe: {
      totalViolations: axe.violations.length,
      seriousOrCritical: blockingAxe.length,
      seriousOrCriticalIds: blockingAxe.map((violation) => violation.id),
    },
    interaction: { ...interaction, hashUpdateMs },
    backNavigation,
    reducedMotion,
  };

  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
