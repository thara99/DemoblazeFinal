# Demoblaze E-Commerce Testing Framework

A robust end-to-end testing framework built with Playwright for the Demoblaze e-commerce website. This framework implements best practices for web testing including Page Object Model design, data-driven testing, and reliable test automation patterns.

[![Playwright Tests](https://github.com/thara99/DemoblazeFinal/actions/workflows/playwright.yml/badge.svg)](https://github.com/thara99/DemoblazeFinal/actions/workflows/playwright.yml)

# Project Overview

This framework provides automated testing for critical user flows in the Demoblaze e-commerce platform, focusing on:

- User account management (signup and login)
- Product search and filtering
- Shopping cart operations
- Checkout process validation

## Key Features

- **Complete End-to-End Testing**: Tests full user journeys from registration to checkout
- **Page Object Model**: Well-structured, maintainable test code with separate page objects
- **Dynamic Test Data**: Uses Faker.js to generate unique test data for each run
- **Robust Selectors**: Implements reliable element targeting strategies
- **Optimized Waiting Mechanisms**: Smart waiting strategies to reduce flakiness
- **Cross-Browser Support**: Tests run on Chromium, Firefox, and WebKit
- **CI/CD Integration**: Ready-made GitHub Actions workflows

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/demoblaze-playwright.git
   cd demoblaze-playwright
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Running Tests

### Run all tests on the default browser:

```
npx playwright test
```

### Run tests on specific browsers:

```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file:

```
npx playwright test tests/userFlow.spec.ts
```

### Run tests with UI mode (for debugging):

```
npx playwright test --ui
```

## Test Reports

After running tests, HTML reports are generated in the `playwright-report` directory. Open the report:

```
npx playwright show-report
```

## Project Structure

```
├── pages/              # Page Object Models
│   ├── AddToCart.ts    # Cart addition functionality
│   ├── CartPage.ts     # Cart page interactions
│   ├── CheckoutPage.ts # Checkout process
│   ├── HomePage.ts     # Home page and product search
│   ├── LoginPage.ts    # Login functionality
│   └── SignupPage.ts   # Registration functionality
├── tests/
│   └── userFlow.spec.ts # Main test scenarios
├── utils/
│   ├── testData.ts     # Test data generation with Faker
│   └── userGenerator.ts # User credentials generation
├── playwright.config.ts # Playwright configuration
└── .github/workflows/   # CI/CD workflows
```

## Best Practices Implemented

- **Dynamic Data Generation**: Fresh test data for each run to avoid data conflicts
- **Explicit Waits**: Reliable element waiting strategies instead of hard-coded timeouts
- **Error Handling**: Robust error recovery and reporting
- **Case-Insensitive Matching**: Flexible text matching for increased reliability
- **Test Isolation**: Each test maintains its own state

## CI/CD Integration (Setup Instructions)

To enable CI/CD for this project:

1. Push the local repository to GitHub:

   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/demoblaze-playwright.git
   git push -u origin main
   ```

2. The GitHub Actions workflows in the `.github/workflows` directory will automatically be detected and enabled in your GitHub repository.

3. You can manually trigger workflows from the "Actions" tab in your GitHub repository.

Once set up, tests will automatically run on:

- Every push to the main branch
- Every pull request
- Daily scheduled runs

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
