import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const projectRoot = process.cwd();
const auditRoot = path.join(projectRoot, 'outputs/frontend_ux_ui_current_state_audit/20260723_142302');

export default defineConfig({
  testDir: path.join(projectRoot, 'tests/e2e'),
  outputDir: path.join(auditRoot, 'fixture-test-results'),
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3001',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 3001 --strictPort',
    cwd: projectRoot,
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
