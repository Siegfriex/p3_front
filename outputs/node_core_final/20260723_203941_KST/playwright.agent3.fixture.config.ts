import { defineConfig, devices } from '@playwright/test';

const repository = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';

export default defineConfig({
  testDir: `${repository}/tests/e2e`,
  testMatch: 'atlas-contract-shell.spec.ts',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  outputDir: `${repository}/outputs/node_core_final/20260723_203941_KST/test-results/fixture`,
  use: {
    baseURL: 'http://127.0.0.1:3031',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
