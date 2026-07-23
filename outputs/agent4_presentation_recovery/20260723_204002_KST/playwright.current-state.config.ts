import { defineConfig, devices } from '@playwright/test';

const repository = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';
const runRoot = `${repository}/outputs/agent4_presentation_recovery/20260723_204002_KST`;

export default defineConfig({
  testDir: runRoot,
  testMatch: 'current-state.visual.spec.ts',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  outputDir: `${runRoot}/test-results/current-state`,
  use: {
    baseURL: 'http://127.0.0.1:4185',
    ...devices['Desktop Chrome'],
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --strictPort --port 4185',
    cwd: repository,
    url: 'http://127.0.0.1:4185',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
