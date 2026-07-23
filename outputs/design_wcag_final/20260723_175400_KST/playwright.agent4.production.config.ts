import { defineConfig, devices } from '@playwright/test';

const repository = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';
const runRoot = `${repository}/outputs/design_wcag_final/20260723_175400_KST`;

export default defineConfig({
  testDir: runRoot,
  testMatch: 'visual-qa.spec.ts',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  outputDir: `${runRoot}/test-results/production`,
  use: {
    baseURL: 'http://127.0.0.1:4180',
    ...devices['Desktop Chrome'],
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --strictPort --port 4180',
    cwd: repository,
    url: 'http://127.0.0.1:4180',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
