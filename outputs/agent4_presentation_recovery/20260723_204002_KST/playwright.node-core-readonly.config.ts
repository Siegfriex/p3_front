import { defineConfig, devices } from '@playwright/test';

const repository = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';
const runRoot = `${repository}/outputs/agent4_presentation_recovery/20260723_204002_KST`;

export default defineConfig({
  testDir: `${repository}/tests/e2e`,
  testMatch: 'atlas-contract-shell.spec.ts',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  outputDir: `${runRoot}/test-results/node-core-readonly`,
  use: {
    baseURL: 'http://127.0.0.1:3025',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --strictPort --port 3025',
    cwd: repository,
    env: {
      VITE_ATLAS_RELEASE_ID: 'contract-release-001',
      VITE_ATLAS_FIXTURE_PROVENANCE: 'CONTRACT_FIXTURE',
    },
    url: 'http://127.0.0.1:3025',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
