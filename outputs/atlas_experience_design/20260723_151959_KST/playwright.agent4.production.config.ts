import { defineConfig, devices } from '@playwright/test';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/atlas_experience_design/20260723_151959_KST';

export default defineConfig({
  testDir: '.',
  testMatch: 'production-route.spec.ts',
  workers: 1,
  retries: 0,
  reporter: [['list']],
  outputDir: `${runRoot}/production-test-results`,
  use: { baseURL: 'http://127.0.0.1:4178', ...devices['Desktop Chrome'] },
  webServer: {
    command: 'npm run preview -- --strictPort --port 4178',
    cwd: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front',
    url: 'http://127.0.0.1:4178',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
