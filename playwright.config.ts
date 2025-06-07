import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 * Configuration optimized for stability and reduced flakiness
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on both CI and locally to reduce flakiness */
  retries: process.env.CI ? 3 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list"]],
  /* Set timeouts to help with stability */
  timeout: 60000, // Global timeout for each test
  expect: {
    timeout: 10000, // Default timeout for assertions
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.demoblaze.com/",

    /* Set consistent viewport for all tests */
    viewport: { width: 1280, height: 720 },

    /* Improve stability with action and navigation timeouts */
    actionTimeout: 15000, // Time for Playwright to click, fill or select an element
    navigationTimeout: 30000, // Time for page navigations to complete

    /* Enhanced automatic waiting to improve test stability */
    launchOptions: {
      slowMo: 100, // Slow down actions by 100ms
    },

    /* Automatically wait for all network requests to finish before continuing */
    ignoreHTTPSErrors: true, // Ignore HTTPS errors

    /* Improve stability with automatically waiting for elements */
    screenshot: "only-on-failure", // Capture screenshot on test failure
    video: "retain-on-failure", // Record video for failed tests

    /* Collect trace for all test runs, helpful for debugging flaky tests */
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        /* Chromium-specific settings to improve stability */
        launchOptions: {
          args: ["--disable-dev-shm-usage", "--disable-gpu", "--no-sandbox"],
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        /* Firefox-specific settings to improve stability */
        launchOptions: {
          firefoxUserPrefs: {
            "browser.cache.disk.enable": false,
            "browser.cache.memory.enable": false,
          },
        },
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000, // Give server 2 minutes to start
  // },
});
