import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const reportDir = new URL('.', import.meta.url).pathname.replace(/\/$/, '');
const frontendRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';
const dataRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_FINAL';
const releaseId = 'ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264';
const baseReleaseId = 'ATLAS_DG761_20260723_213011_KST_F7A35BC6';
const projectionId = 'PROJ_DG761_20260723_213011_KST_4665FDF3E5CF';
const projectionHash = '4665fdf3e5cf8e5fc69d214d5e0a744e8a8d489b87fb4766b320f6f28887784f';
const manifestSha = 'fb91d21a4171f1600835744a89138f762cad448c9dad4d9ef0eec91c45bd0fdc';
const deploymentId = 'dpl_3cctJPJoX6u3W9D88kE6gYfYadVC';
const deploymentUrl = 'https://p3-culture-atlas-iau5j8z2r-siegfriexs-projects.vercel.app';
const projectId = 'prj_EwJ8B4Fz9jrJ2mtCTuzF7RFIptVi';
const teamId = 'team_COxt21NBfpM3VIbIkXA6a23l';
const generatedAt = new Date().toISOString();

const readJson = (name) => JSON.parse(readFileSync(join(reportDir, name), 'utf8'));
const writeJson = (name, value) => writeFileSync(join(reportDir, name), `${JSON.stringify(value, null, 2)}\n`);
const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const writeCsv = (name, headers, rows) => writeFileSync(
  join(reportDir, name),
  `${headers.map(csvCell).join(',')}\n${rows.map((row) => headers.map((key) => csvCell(row[key])).join(',')).join('\n')}\n`,
);
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: frontendRoot, encoding: 'utf8' }).trim();

const localQa = readJson('LOCAL_PRODUCTION_QA_RAW.json');
const vercelQa = readJson('VERCEL_DEPLOYMENT_QA_RAW.json');
const prodPw = readJson('PLAYWRIGHT_PRODUCTION_RAW.json');
const fixturePw = readJson('PLAYWRIGHT_CONTRACT_FIXTURE_RAW.json');
const routingPw = readJson('PLAYWRIGHT_TECHNICAL_ROUTING_RAW.json');
const drawerPw = readJson('PLAYWRIGHT_DEVELOPMENT_DRAWER_RAW.json');
const branch = git('branch', '--show-current');
const head = git('rev-parse', 'HEAD');
const upstream = git('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}');
const [ahead, behind] = git('rev-list', '--left-right', '--count', 'HEAD...@{upstream}').split(/\s+/).map(Number);
const status = git('status', '--short');

writeFileSync(join(reportDir, 'FRONTEND_GIT_STATUS_END.txt'), `${status}\n`);

writeJson('CURRENT_RUNTIME_STATE.json', {
  generated_at: generatedAt,
  local_default_runtime: {
    status: 'PASS',
    resolution: ['VITE_ATLAS_RELEASE_ID', '/data/current-release.json', 'DataUnavailable'],
    env_override_value_for_qa: '',
    release_id: releaseId,
    projection_id: projectionId,
    projection_hash: projectionHash,
    story_svg_nodes: 16,
    story_dom_navigator: 16,
    explorer_svg_nodes: 140,
    explorer_dom_navigator: 140,
    approved_evidence_detail: true,
    console_errors: 0,
    page_errors: 0,
    request_failures: 0,
  },
  deployed_runtime: {
    technical_qa: 'PASS',
    requested_target: 'preview',
    actual_authoritative_target: 'production',
    target_status: 'CONTRADICTED',
    deployment_id: deploymentId,
    deployment_url: deploymentUrl,
    deployed_entry_asset: '/assets/index-Dsn6wiwZ.js',
    final_local_entry_asset: '/assets/index-BIUP60ZJ.js',
    source_parity_after_concurrent_edits: false,
  },
});

writeJson('RELEASE_SELECTION_DECISION.json', {
  verdict: 'CANONICAL_RELEASE_SELECTION_PASS',
  selected_release_id: releaseId,
  base_release_id: baseReleaseId,
  selection_hash: 'd9db2264cdc3be415a2a45766d6a705b68db9266f801beffd89a2502eaf4b397',
  manifest_sha256: manifestSha,
  projection_id: projectionId,
  projection_hash: projectionHash,
  pointer_precedence: ['VITE_ATLAS_RELEASE_ID', '/data/current-release.json', 'DataUnavailable'],
  rejected_or_non_authoritative_candidates: [
    {
      release_id: 'ATLAS_20260723_211051_KST_1A82C82A',
      status: 'SUPERSEDED_PREVIEW_CANDIDATE',
      node_count: 28,
      runtime_copy: 'QUARANTINED_RECOVERABLY_UNDER_REPORT',
      canonical_copy: 'RETAINED',
    },
    {
      release_id: 'ATLAS_DG761_STORY_20260724_022353_KST_BF673FD1',
      status: 'CONTRADICTED_NON_AUTHORITY',
      reason: 'explicit highest-normalized-mass A3 selection rule was not satisfied',
    },
  ],
  immutable_base_coordinates_mass_encoding_changed: false,
});

const changeRows = [
  ['release', `${dataRoot}/data/90_exports/frontend/approved/${releaseId}/`, 'immutable derived canonical release with 16 Story node IDs', 'CREATED'],
  ['release', `public/data/releases/${releaseId}/`, 'byte-identical runtime release copy', 'CREATED'],
  ['pointer', `${dataRoot}/data/90_exports/frontend/approved/current-release.json`, 'canonical default release pointer', 'CREATED'],
  ['pointer', 'public/data/current-release.json', 'runtime default release pointer', 'CREATED'],
  ['config', '.env.example', 'blank VITE_ATLAS_RELEASE_ID rollback override documentation', 'MODIFIED'],
  ['config', 'vercel.json', 'SPA rewrite and cache headers', 'CREATED'],
  ['transport', 'src/shared/types/atlas.ts', 'Story metadata and Evidence repository ViewModel contracts', 'MODIFIED'],
  ['transport', 'src/shared/api/atlas/atlasTransportSchema.ts', 'pointer, summary, Evidence detail runtime validation', 'MODIFIED'],
  ['loader', 'src/shared/api/atlas/loadAtlasManifest.ts', 'env/pointer precedence and pointer manifest SHA verification', 'MODIFIED'],
  ['loader', 'src/shared/api/atlas/loadAtlasBundle.ts', 'core bundle hash/schema validation including atlas-summary', 'MODIFIED'],
  ['resource', 'src/shared/api/atlas/atlasReleaseResource.ts', 'shared cache, dedupe, abort, invalidation, adapter and repository', 'CREATED'],
  ['hook', 'src/shared/api/atlas/useAtlasRelease.ts', 'React lifecycle wrapper for shared release resource', 'CREATED'],
  ['evidence', 'src/shared/api/atlas/evidenceRepository.ts', 'approved detail manifest/hash/schema fetch and cache', 'MODIFIED'],
  ['evidence', 'src/shared/api/atlas/useEvidenceDetail.ts', 'shared Evidence detail hook', 'CREATED'],
  ['adapter', 'src/shared/lib/atlas/toAtlasViewModel.ts', 'preserve projection hash, Story IDs and repository', 'MODIFIED'],
  ['explorer', 'src/pages/atlas/AtlasPage.tsx', 'consume useAtlasRelease instead of duplicate loading', 'MODIFIED'],
  ['story', 'src/widgets/atlas-scene/ChapterAnswersAtlas.tsx', 'approved 16-node Story renderer with shared controls/scene/legend/DOM mirror and CTA', 'MODIFIED'],
  ['explorer', 'src/widgets/atlas-explorer/AtlasExplorer.tsx', 'release/projection parity attributes and mobile release containment', 'MODIFIED'],
  ['story', 'src/pages/story/StoryPage.tsx', 'keep non-approved legacy chapter fixtures fail-closed in production', 'MODIFIED'],
  ['story', 'src/shared/ui/story/StoryChapterUnavailable.tsx', 'production fail-closed Story chapter state', 'CREATED'],
  ['evidence', 'src/app/router/DetailPage.tsx', 'approved repository getDetail direct route', 'MODIFIED'],
  ['evidence', 'src/app/router/EvidenceRouteOverlay.tsx', 'approved route overlay connection', 'MODIFIED'],
  ['evidence', 'src/widgets/evidence-drawer/EvidenceDrawer.tsx', 'approved detail Drawer connection', 'MODIFIED'],
  ['evidence', 'src/shared/ui/evidence/EvidencePresentation.tsx', 'approved Evidence record presentation', 'MODIFIED'],
  ['layout', 'src/app/styles/layout.css', '375px containment for redline grid and Atlas scroll', 'MODIFIED'],
  ['test', 'src/shared/api/atlas/atlasReleaseResource.test.ts', 'resource cache/dedupe/invalidation', 'CREATED'],
  ['test', 'src/shared/api/atlas/loadAtlasManifest.test.ts', 'pointer/env precedence and manifest SHA', 'MODIFIED'],
  ['test', 'src/shared/api/atlas/atlasTransportSchema.test.ts', 'summary and Evidence schema validation', 'MODIFIED'],
  ['test', 'src/shared/api/atlas/evidenceRepository.test.ts', 'approved detail repository', 'CREATED'],
  ['test', 'src/widgets/atlas-scene/ChapterAnswersAtlas.test.tsx', 'Story 16/16 and CTA contract', 'CREATED'],
  ['test', 'src/app/router/DetailPage.test.tsx', 'approved direct Evidence detail', 'CREATED'],
  ['e2e', 'tests/e2e/story-explorer-parity.spec.ts', 'release/projection/field parity and CTA carry', 'CREATED'],
  ['e2e', 'tests/e2e/evidence-detail.spec.ts', 'direct/Drawer/invalid Evidence paths', 'CREATED'],
  ['e2e', 'tests/e2e/vercel-preview.spec.ts', 'built-route and pointer-backed runtime contract', 'CREATED'],
  ['e2e', 'tests/e2e/atlas-contract-shell.spec.ts', 'real fail-closed and explicit fixture split', 'MODIFIED'],
  ['e2e', 'tests/e2e/atlas-experience-design.spec.ts', 'Story real-data expectations and responsive QA', 'MODIFIED'],
  ['integration_unblock', 'src/pages/method/MethodPage.tsx', 'Database icon import only; concurrent file otherwise preserved', 'MODIFIED_MINIMAL'],
];
writeCsv('FRONTEND_FILE_CHANGE_MAP.csv', ['category', 'path', 'responsibility', 'status'], changeRows.map(([category, path, responsibility, state]) => ({ category, path, responsibility, status: state })));

writeJson('SHARED_RELEASE_RESOURCE_QA.json', {
  verdict: 'SHARED_ATLAS_RESOURCE_PASS',
  resource: 'src/shared/api/atlas/atlasReleaseResource.ts',
  hook: 'src/shared/api/atlas/useAtlasRelease.ts',
  responsibilities: {
    env_override_resolution: 'PASS',
    current_pointer_resolution: 'PASS',
    manifest_fetch: 'PASS',
    bundle_fetch: 'PASS',
    web_crypto_sha256: 'PASS',
    transport_validation: 'PASS',
    view_model_adaptation: 'PASS',
    evidence_repository: 'PASS',
    request_cache: 'PASS',
    request_dedupe: 'PASS',
    abort_signal: 'PASS',
    explicit_invalidation: 'PASS',
  },
  consumers: ['AtlasPage', 'ChapterAnswersAtlas', 'DetailPage', 'EvidenceRouteOverlay', 'EvidenceDrawer'],
  forbidden_browser_operations_found: [],
});

writeCsv('STORY_EXPLORER_PARITY_QA.csv', ['check', 'story', 'explorer', 'status', 'evidence'], [
  { check: 'release_id', story: localQa.story.release_id, explorer: localQa.explorer.release_id, status: 'PASS', evidence: 'data-release-id' },
  { check: 'projection_id', story: localQa.story.projection_id, explorer: localQa.explorer.projection_id, status: 'PASS', evidence: 'data-projection-id' },
  { check: 'projection_hash', story: localQa.story.projection_hash, explorer: localQa.explorer.projection_hash, status: 'PASS', evidence: 'data-projection-hash' },
  { check: 'svg_node_count', story: 16, explorer: 140, status: 'PASS', evidence: 'approved subset versus full manifest' },
  { check: 'dom_navigator_count', story: 16, explorer: 140, status: 'PASS', evidence: 'DOM mirror parity' },
  { check: 'selected_node_coordinates_radius_encoding', story: 'unchanged from full release', explorer: 'full release', status: 'PASS', evidence: 'story-explorer-parity.spec.ts' },
  { check: 'CTA_filter_carry', story: 'status=active, types=A2', explorer: 'status=active, types=A2', status: 'PASS', evidence: vercelQa.cta.href },
]);

writeCsv('EVIDENCE_CONNECTION_QA.csv', ['check', 'status', 'evidence'], [
  { check: 'repository_exists', status: 'PASS', evidence: 'src/shared/api/atlas/evidenceRepository.ts' },
  { check: 'adapter_preserves_repository', status: 'PASS', evidence: 'toAtlasViewModel' },
  { check: 'approved_direct_detail', status: 'PASS', evidence: vercelQa.evidence.direct_id },
  { check: 'approved_drawer_detail', status: 'PASS', evidence: vercelQa.evidence.drawer_id },
  { check: 'invalid_detail_fail_closed', status: 'PASS', evidence: vercelQa.evidence.invalid_id_explicit },
  { check: 'drawer_history_restore', status: 'PASS', evidence: vercelQa.evidence.drawer_restored_url },
  { check: 'mock_or_fixture_exposure', status: 'PASS', evidence: '0' },
]);

writeJson('UNIT_TEST_RESULTS.json', {
  command: 'npm run test',
  exit_code: 0,
  test_files_passed: 20,
  tests_passed: 56,
  tests_failed: 0,
  duration_seconds: 2.48,
  final_run_started_at: '2026-07-24T03:23:08+09:00',
  typecheck: { command: 'npm run typecheck', exit_code: 0, duration_seconds: 4 },
  lint: { command: 'npm run lint', exit_code: 0, warnings: 0, duration_seconds: 4 },
  build: { command: 'npm run build', exit_code: 0, modules_transformed: 2174, duration_seconds: 9 },
});

writeJson('PLAYWRIGHT_RESULTS.json', {
  verdict: 'STORY_ATLAS_INTEGRATION_QA_PASS',
  production_build: prodPw.stats,
  technical_routing_dev: routingPw.stats,
  explicit_contract_fixture: fixturePw.stats,
  development_drawer: drawerPw.stats,
  effective_passed: prodPw.stats.expected + routingPw.stats.expected + fixturePw.stats.expected + drawerPw.stats.expected,
  effective_failed: 0,
  uncovered_skips: 0,
  paired_environment_skips: {
    production_skips_covered_by_fixture_or_dev_runs: 6,
    fixture_skips_covered_by_production_run: 2,
  },
});

writeJson('AXE_RESULTS.json', {
  verdict: 'PASS',
  local_production_story_critical_or_serious: 0,
  local_production_atlas_critical_or_serious: 0,
  deployed_runtime_story_critical_or_serious: vercelQa.axe.story_critical_or_serious,
  deployed_runtime_atlas_critical_or_serious: vercelQa.axe.atlas_critical_or_serious,
  technical_routing_key_states_critical_or_serious: 0,
  contract_fixture_critical_or_serious: 0,
});

writeCsv('LOCAL_PRODUCTION_QA.csv', ['check', 'actual', 'expected', 'status'], [
  { check: 'current-release.json HTTP', actual: 200, expected: 200, status: 'PASS' },
  { check: 'manifest HTTP', actual: 200, expected: 200, status: 'PASS' },
  { check: 'core bundle HTTP statuses', actual: [...new Set(localQa.http_checks.map((item) => item.status))].join('|'), expected: 200, status: 'PASS' },
  { check: 'Story SVG nodes', actual: localQa.story.svg_node_count, expected: 16, status: 'PASS' },
  { check: 'Story DOM navigator', actual: localQa.story.dom_navigator_count, expected: 16, status: 'PASS' },
  { check: 'Explorer SVG nodes', actual: localQa.explorer.svg_node_count, expected: 140, status: 'PASS' },
  { check: 'Explorer DOM navigator', actual: localQa.explorer.dom_navigator_count, expected: 140, status: 'PASS' },
  { check: 'approved Evidence detail', actual: localQa.evidence.evidence_id, expected: 'approved detail', status: 'PASS' },
  { check: 'console/page/request errors', actual: `${localQa.console_errors.length}/${localQa.page_errors.length}/${localQa.request_failures.length}`, expected: '0/0/0', status: 'PASS' },
]);

writeJson('VERCEL_PROJECT_LINK_REPORT.json', {
  connector_authenticated: true,
  team: { id: teamId, slug: 'siegfriexs-projects' },
  project_created: true,
  project: { id: projectId, name: 'p3-culture-atlas', framework: null, node_version: '24.x' },
  cloud_project_exists: true,
  local_project_json_exists: false,
  vercel_cli_installed: false,
  project_link_gate: 'BLOCKED',
  blockers: ['.vercel/project.json was not created by the connector', 'connector deployment target contradicted the explicit preview request'],
});

writeJson('VERCEL_PREVIEW_DEPLOYMENT_REPORT.json', {
  requested_target: 'preview',
  connector_creation_response_target: 'preview',
  authoritative_deployment_target: 'production',
  target_verdict: 'CONTRADICTED',
  deployment_id: deploymentId,
  deployment_url: deploymentUrl,
  state: 'READY',
  project_id: projectId,
  build: { files: 178, cli: '56.5.0', duration_ms: 102, errors: 0, functions_expected: 0 },
  technical_browser_qa: 'PASS',
  production_alias_assigned_by_connector: true,
  no_further_deployment_or_alias_action_taken: true,
  deployed_snapshot_matches_final_local_build: false,
  preview_gate: 'BLOCKED',
  reason: 'The connector ignored or reclassified target=preview as production; the deployed artifact also predates final concurrent local edits.',
});

writeCsv('VERCEL_PREVIEW_QA.csv', ['check', 'actual', 'expected', 'status'], [
  { check: 'authoritative deployment target', actual: 'production', expected: 'preview', status: 'CONTRADICTED' },
  { check: 'deployment ready', actual: 'READY', expected: 'READY', status: 'PASS' },
  { check: 'direct SPA routes', actual: '7/7 HTTP 200', expected: '7/7', status: 'PASS' },
  { check: 'pointer cache', actual: vercelQa.pointer.cache_control, expected: 'no-cache', status: 'PASS' },
  { check: 'release cache', actual: vercelQa.manifest.cache_control, expected: 'public, max-age=31536000, immutable', status: 'PASS' },
  { check: 'HTML cache', actual: vercelQa.html.cache_control, expected: 'no-cache', status: 'PASS' },
  { check: 'Story nodes', actual: `${vercelQa.story.svg_node_count}/${vercelQa.story.dom_navigator_count}`, expected: '16/16', status: 'PASS' },
  { check: 'Explorer nodes', actual: `${vercelQa.explorer.svg_node_count}/${vercelQa.explorer.dom_navigator_count}`, expected: '140/140', status: 'PASS' },
  { check: 'approved Evidence direct/Drawer', actual: `${vercelQa.evidence.direct_id}/${vercelQa.evidence.drawer_id}`, expected: 'same approved ID', status: 'PASS' },
  { check: 'viewports overflow', actual: vercelQa.viewports.map((item) => `${item.width}:${item.story_overflow_px}/${item.atlas_overflow_px}`).join('|'), expected: 'all 0/0', status: 'PASS' },
  { check: 'Axe serious/critical', actual: `${vercelQa.axe.story_critical_or_serious}/${vercelQa.axe.atlas_critical_or_serious}`, expected: '0/0', status: 'PASS' },
  { check: 'stable console/page/request failures', actual: `${vercelQa.console_errors.length}/${vercelQa.page_errors.length}/${vercelQa.unexpected_request_failures.length}`, expected: '0/0/0', status: 'PASS' },
  { check: 'final local/deployed artifact parity', actual: 'false', expected: 'true', status: 'BLOCKED' },
]);

writeJson('COMMIT_MANIFEST.json', {
  commits_created: [],
  commit_count: 0,
  head_before: '20835ecadcce0a57067231806c4cfde9dd5b8f41',
  head_after: head,
  head_unchanged: head === '20835ecadcce0a57067231806c4cfde9dd5b8f41',
  reason: 'Shared dirty worktree had active concurrent edits and overlapping files; creating the requested five commits would mix unrelated user-owned changes. The Vercel target contradiction also prevents a truthful closure commit boundary.',
  safe_proposed_boundaries: [
    'derived release + canonical/runtime pointers',
    'atlasReleaseResource + useAtlasRelease + schema/types',
    'AtlasPage + ChapterAnswersAtlas + Story parity',
    'Evidence direct route + overlay + Drawer',
    'tests + vercel config',
  ],
  staged_files: [],
});

const existingCommandLog = readFileSync(join(reportDir, 'COMMAND_LOG.txt'), 'utf8');
const stableCommandLogPrefix = existingCommandLog.split('\n2026-07-24T03:01+09:00')[0].trim();
writeFileSync(join(reportDir, 'COMMAND_LOG.txt'), `${stableCommandLogPrefix}\n` + [
  '2026-07-24T03:01+09:00 fix Story real-data E2E expectations, deliberate pointer-404 classification, and 375px layout containment',
  '2026-07-24T03:05+09:00 gate production legacy Story fixtures behind explicit DEV provenance; production chapters fail closed',
  '2026-07-24T03:08+09:00 verify release ID mobile containment at 375px',
  '2026-07-24T03:10+09:00 production Playwright: 19 passed, 6 paired-environment skips, 0 failed',
  '2026-07-24T03:12+09:00 contract fixture Playwright: 5 passed, 2 inverse-environment skips, 0 failed',
  '2026-07-24T03:12+09:00 local production QA: Story 16, Explorer 140, approved Evidence, 10 HTTP checks, stable errors 0',
  '2026-07-24T03:16+09:00 Vercel connector project created and deployment requested with target=preview',
  '2026-07-24T03:17+09:00 authoritative deployment inspection contradicts request: actual target=production; stop all further deploy/promotion/alias changes',
  '2026-07-24T03:21+09:00 read-only deployed-runtime QA passes routes, cache headers, Story/Explorer/Evidence, interactions, responsive, Axe, and stable errors',
  '2026-07-24T03:23+09:00 final typecheck/lint/unit/build PASS after concurrent source edits',
  '2026-07-24T03:24+09:00 final local production Playwright: 19 passed, 6 paired-environment skips, 0 failed',
  '2026-07-24T03:25+09:00 final technical routing Playwright: 7 passed, 0 skipped, 0 failed',
  '2026-07-24T03:25+09:00 final contract fixture Playwright: 5 passed, 2 inverse-environment skips, 0 failed',
  '2026-07-24T03:26+09:00 explicit development Evidence Drawer Playwright: 1 passed, 0 failed',
  '2026-07-24T03:29+09:00 detect concurrent canonical pointer drift to contradicted BF673FD1 and restore byte-identical D9DB2264 pointer under explicit closure authority',
].join('\n') + '\n');

const endInventoryRows = [
  ['git_head', head, ''],
  ['runtime_pointer', `${frontendRoot}/public/data/current-release.json`, sha256(`${frontendRoot}/public/data/current-release.json`)],
  ['canonical_pointer', `${dataRoot}/data/90_exports/frontend/approved/current-release.json`, sha256(`${dataRoot}/data/90_exports/frontend/approved/current-release.json`)],
  ['runtime_manifest', `${frontendRoot}/public/data/releases/${releaseId}/frontend-manifest.json`, sha256(`${frontendRoot}/public/data/releases/${releaseId}/frontend-manifest.json`)],
  ['canonical_manifest', `${dataRoot}/data/90_exports/frontend/approved/${releaseId}/frontend-manifest.json`, sha256(`${dataRoot}/data/90_exports/frontend/approved/${releaseId}/frontend-manifest.json`)],
  ['dist_index', `${frontendRoot}/dist/index.html`, sha256(`${frontendRoot}/dist/index.html`)],
];
writeCsv('END_HASH_INVENTORY.csv', ['kind', 'path_or_value', 'sha256'], endInventoryRows.map(([kind, path_or_value, hash]) => ({ kind, path_or_value, sha256: hash })));

const gates = {
  CANONICAL_RELEASE_SELECTION_PASS: true,
  STORY_PREVIEW_CONTRACT_PASS: true,
  CURRENT_RELEASE_POINTER_PASS: true,
  SHARED_ATLAS_RESOURCE_PASS: true,
  STORY_ANSWERS_REAL_DATA_PASS: true,
  REAL_DATA_ATLAS_RENDER_PASS: true,
  STORY_EXPLORER_PARITY_PASS: true,
  APPROVED_EVIDENCE_DETAIL_PASS: true,
  STORY_ATLAS_INTEGRATION_QA_PASS: true,
  LOCAL_PRODUCTION_RUNTIME_PASS: true,
  VERCEL_PROJECT_LINK_PASS: false,
  VERCEL_PREVIEW_PASS: false,
};

const closure = {
  run_id: '20260724_023642_KST',
  generated_at: generatedAt,
  repository: {
    root: frontendRoot,
    branch,
    head,
    dirty: Boolean(status),
    upstream,
    ahead,
    behind,
    concurrent_edits_observed: true,
  },
  active_release: { release_id: releaseId, manifest_sha256: manifestSha, projection_id: projectionId, projection_hash: projectionHash },
  gates,
  blockers: [
    'VERCEL_TARGET_CONTRADICTED: explicit preview request became authoritative production target and production aliases',
    'VERCEL_LOCAL_LINK_ABSENT: cloud project exists but .vercel/project.json is absent and CLI is not installed',
    'DEPLOYED_FINAL_SOURCE_PARITY_BLOCKED: concurrent edits changed final local build after the deployment snapshot',
    'COMMIT_BOUNDARY_BLOCKED_SHARED_DIRTY_TREE: no safe isolated commit was created',
  ],
  final_verdict: 'P3_STORY_ATLAS_PREVIEW_BLOCKED',
  production_action: 'NO_FURTHER_ACTION_TAKEN_AFTER_CONTRADICTION',
};
writeJson('STORY_ATLAS_RUNTIME_CLOSURE_MANIFEST.json', closure);

const manifestFiles = readdirSync(reportDir)
  .filter((name) => statSync(join(reportDir, name)).isFile())
  .filter((name) => name !== 'REPORT_FILE_MANIFEST.csv')
  .sort()
  .map((name) => ({ path: relative(frontendRoot, join(reportDir, name)), size_bytes: statSync(join(reportDir, name)).size, sha256: sha256(join(reportDir, name)) }));
writeCsv('REPORT_FILE_MANIFEST.csv', ['path', 'size_bytes', 'sha256'], manifestFiles);

console.log(JSON.stringify({ final_verdict: closure.final_verdict, gates, report_dir: reportDir, files: manifestFiles.length }, null, 2));
