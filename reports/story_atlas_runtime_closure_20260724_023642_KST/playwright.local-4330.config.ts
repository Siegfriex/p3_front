import { defineConfig, devices } from '@playwright/test';

process.env.AGENT4_PRODUCTION_E2E = 'true';

export default defineConfig({
  testDir: '../../tests/e2e',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/reports/story_atlas_runtime_closure_20260724_023642_KST/PLAYWRIGHT_PRODUCTION_RAW.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4330',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
});
