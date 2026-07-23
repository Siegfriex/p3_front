import { defineConfig, devices } from '@playwright/test';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/atlas_experience_design/20260723_151959_KST';

export default defineConfig({
  testDir: '.',
  testMatch: 'visual-capture.spec.ts',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  timeout: 90_000,
  workers: 1,
  reporter: [['list']],
  outputDir: `${runRoot}/capture-test-results`,
  use: {
    baseURL: 'http://127.0.0.1:3004',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --strictPort --port 3004',
    cwd: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front',
    url: 'http://127.0.0.1:3004',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
