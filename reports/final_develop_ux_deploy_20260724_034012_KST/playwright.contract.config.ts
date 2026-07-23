import { defineConfig, devices } from '@playwright/test';

process.env.ATLAS_CONTRACT_FIXTURE_E2E = 'true';

export default defineConfig({
  testDir: '../../tests/e2e',
  testMatch: ['atlas-contract-shell.spec.ts'],
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4380',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'VITE_ATLAS_RELEASE_ID=contract-release-001 VITE_ATLAS_FIXTURE_PROVENANCE=CONTRACT_FIXTURE npm run dev -- --host 127.0.0.1 --port 4380 --strictPort',
    url: 'http://127.0.0.1:4380',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
