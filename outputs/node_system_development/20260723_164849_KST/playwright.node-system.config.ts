import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/tests/e2e',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', {
    outputFolder: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/node_system_development/20260723_164849_KST/playwright-report',
    open: 'never',
  }]],
  use: {
    baseURL: 'http://127.0.0.1:3011',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --strictPort --port 3011',
    cwd: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front',
    url: 'http://127.0.0.1:3011',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
