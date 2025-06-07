# Demoblaze Playwright Test Framework

![Playwright Tests](https://github.com/thara99/demoblaze-playwright/actions/workflows/playwright.yml/badge.svg)

This project contains automated tests for the Demoblaze e-commerce application using Playwright.

## Features

- Complete E2E test flow including signup, login, product search, cart management, and checkout
- Page Object Model design pattern
- Dynamic test data generation with Faker.js
- Cross-browser testing support
- CI/CD integration with GitHub Actions

## Running Tests Locally

```bash
# Install dependencies
npm install

# Run tests on all browsers
npx playwright test

# Run tests on a specific browser
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui
```

## Test Reports

After test execution, reports are available in the `playwright-report` directory. Open `playwright-report/index.html` to view the HTML report.

## CI/CD

Tests run automatically on:

- Every push to main/master branch
- Every pull request to main/master branch
- Daily scheduled run at midnight

## Project Structure

- `pages/`: Page objects for different parts of the application
- `tests/`: Test specifications
- `utils/`: Utility functions and test data generators
