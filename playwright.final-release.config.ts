import { defineConfig, devices } from '@playwright/test';

process.env.AGENT4_PRODUCTION_E2E = 'true';
delete process.env.VITE_ATLAS_RELEASE_ID;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  grepInvert: /foundation gallery exists only|development Evidence Drawer preserves|restores filters and node selection through URL|supports keyboard selection, Escape clear|keeps node coordinates and radius invariant|has zero Axe critical or serious violations in the contract fixture shell|records the contract-fixture node rendering performance baseline/,
  reporter: [
    ['list'],
    ['json', { outputFile: '/tmp/p3-final-model-playwright-145233.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4176',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }],
  webServer: {
    command: './node_modules/.bin/vite preview --host 127.0.0.1 --port 4176 --strictPort',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
