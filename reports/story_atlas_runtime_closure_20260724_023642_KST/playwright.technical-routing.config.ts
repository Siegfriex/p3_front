import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../tests/e2e',
  testMatch: ['technical-routing.spec.ts'],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/reports/story_atlas_runtime_closure_20260724_023642_KST/PLAYWRIGHT_TECHNICAL_ROUTING_RAW.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4350',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'VITE_ATLAS_RELEASE_ID= npm run dev -- --host 127.0.0.1 --port 4350 --strictPort',
    url: 'http://127.0.0.1:4350',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
