import { defineConfig, devices } from '@playwright/test';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/atlas_experience_design/20260723_151959_KST';

export default defineConfig({
  testDir: '../../../tests/e2e',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  outputDir: `${runRoot}/fixture-test-results`,
  use: {
    baseURL: 'http://127.0.0.1:3003',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --strictPort --port 3003',
    cwd: '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front',
    env: {
      VITE_ATLAS_RELEASE_ID: 'contract-release-001',
      VITE_ATLAS_FIXTURE_PROVENANCE: 'CONTRACT_FIXTURE',
    },
    url: 'http://127.0.0.1:3003',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
