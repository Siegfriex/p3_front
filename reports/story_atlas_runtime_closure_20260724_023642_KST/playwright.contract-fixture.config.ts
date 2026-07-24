import { defineConfig, devices } from '@playwright/test';

process.env.ATLAS_CONTRACT_FIXTURE_E2E = 'true';

export default defineConfig({
  testDir: '../../tests/e2e',
  testMatch: ['atlas-contract-shell.spec.ts'],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/reports/story_atlas_runtime_closure_20260724_023642_KST/PLAYWRIGHT_CONTRACT_FIXTURE_RAW.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4340',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'VITE_ATLAS_RELEASE_ID=contract-release-001 VITE_ATLAS_FIXTURE_PROVENANCE=CONTRACT_FIXTURE npm run dev -- --host 127.0.0.1 --port 4340 --strictPort',
    url: 'http://127.0.0.1:4340',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
