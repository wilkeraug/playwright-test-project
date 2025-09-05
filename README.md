# 🎭 Playwright Multi-Site Test Automation Framework
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40.0-green.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue.svg)](https://www.typescriptlang.org/)

A comprehensive test automation framework featuring **ready-to-run test suites** for multiple demo sites, plus a generic template for custom applications. Built with Playwright and TypeScript following industry best practices.

## ✨ Key Features

- 🚀 **Ready-to-Run Tests** - 50+ working tests for real demo sites
- 🎯 **Multiple Test Sites** - SauceDemo, Herokuapp, ReqRes API
- 📦 **Page Object Model** - Clean, maintainable architecture
- 🔄 **CI/CD Ready** - GitHub Actions workflow included
- 📊 **Multiple Reporters** - HTML, JSON, JUnit formats
- 🌐 **Cross-Browser** - Chrome, Firefox, Safari support
- 📱 **Responsive Testing** - Mobile browser support
- ♿ **Accessibility** - Built-in a11y testing capabilities
- 🎨 **TypeScript** - Full type safety and IntelliSense
- 🔧 **Customizable** - Generic template for any application

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Available Test Suites](#-available-test-suites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Test Sites & Credentials](#-test-sites--credentials)
- [CI/CD Integration](#-cicd-integration)
- [Writing Custom Tests](#-writing-custom-tests)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Quick Start

Get up and running in less than 5 minutes:

```bash
# Clone the repository
git clone https://github.com/yourusername/playwright-project.git
cd playwright-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run your first test suite
npm run test:saucedemo

# View the HTML report
npm run report
```

## 📁 Project Structure

```
playwright-project/
├── package.json                    # Main package file 
├── playwright.config.ts            # Main config
├── .gitignore                      # Git ignore 
├── setup.sh                        # Setup script 
├── .github/
│   └── workflows/
│       └── tests.yml               # CI/CD 
├── templates/
│   ├── saucedemo/
│   │   ├── playwright.config.ts   # Config
│   │   ├── README.md               # Docs 
│   │   ├── pages/
│   │   │   ├── login.page.ts      
│   │   │   ├── inventory.page.ts  
│   │   │   ├── cart.page.ts       
│   │   │   └── checkout.page.ts   
│   │   └── tests/
│   │       ├── login.spec.ts      
│   │       ├── inventory.spec.ts  
│   │       └── e2e-purchase.spec.ts 
│   ├── herokuapp/
│   │   ├── playwright.config.ts   
│   │   ├── README.md               
│   │   ├── pages/
│   │   │   └── base.page.ts       
│   │   └── tests/
│   │       └── [multiple test files] 
│   ├── reqres-api/
│   │   ├── playwright.config.ts  
│   │   ├── README.md               
│   │   └── tests/
│   │       ├── users.spec.ts      
│   │       ├── auth.spec.ts       
│   │       └── resources.spec.ts  
│   └── generic/
│       └── [your original template structure]
└── shared/
    └── utils/
        └── helpers.ts              
```

## 🎯 Available Test Suites

### 1. 🛍️ SauceDemo (E-commerce)

Complete E2E test suite for an e-commerce application.

- **URL**: https://www.saucedemo.com
- **Tests**: 20+ scenarios
- **Features**:
  - User authentication (multiple user types)
  - Product browsing and sorting
  - Shopping cart management
  - Complete checkout flow
  - Order confirmation

### 2. 🌐 Herokuapp (The Internet)

Various UI testing challenges and patterns.

- **URL**: https://the-internet.herokuapp.com
- **Tests**: 15+ scenarios
- **Features**:
  - Form authentication
  - Dynamic content loading
  - Drag and drop
  - JavaScript alerts
  - File upload/download
  - Hover effects
  - Data tables

### 3. 🔌 ReqRes API

Comprehensive REST API testing suite.

- **URL**: https://reqres.in/api
- **Tests**: 15+ scenarios
- **Features**:
  - CRUD operations
  - Authentication/Registration
  - Response validation
  - Error handling
  - Performance checks

### 4. 📄 Generic Template

Customizable template for your own application.

- Boilerplate structure
- Example page objects
- Sample test patterns
- Utility functions

## 💻 Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Step-by-Step Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/playwright-project.git
cd playwright-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
# Install all browsers
npx playwright install

# Or install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

4. **Verify installation**
```bash
npm run test:saucedemo -- --headed
```

## 🏃 Running Tests

### Run All Test Suites
```bash
npm run test:all-demos        # Run all demo site tests
```

### Run Specific Test Suites
```bash
npm run test:saucedemo        # E-commerce tests
npm run test:herokuapp        # UI challenge tests
npm run test:api             # API tests
```

### Run with Different Options
```bash
# Run in headed mode (see browser)
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# Run specific test file
npx playwright test templates/saucedemo/tests/login.spec.ts

# Run tests matching specific pattern
npx playwright test -g "login"

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate New Tests
```bash
# Open Playwright code generator
npm run codegen

# Generate for specific site
npm run codegen:saucedemo
npm run codegen:herokuapp
```

### View Test Reports
```bash
# Open HTML report
npm run report

# View specific suite report
npm run report:saucedemo
npm run report:herokuapp
npm run report:api
```

## 🔑 Test Sites & Credentials

### SauceDemo Credentials
| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Normal user |
| `locked_out_user` | `secret_sauce` | Locked account |
| `problem_user` | `secret_sauce` | User with site issues |
| `performance_glitch_user` | `secret_sauce` | Performance issues |

### Herokuapp Credentials
| Username | Password | Description |
|----------|----------|-------------|
| `tomsmith` | `SuperSecretPassword!` | Valid user |

### ReqRes API Credentials
| Email | Password | Description |
|-------|----------|-------------|
| `eve.holt@reqres.in` | `cityslicka` | Valid API user |

## 🔄 CI/CD Integration

The project includes a complete GitHub Actions workflow that:

- ✅ Runs on push to main/develop branches
- ✅ Runs on pull requests
- ✅ Scheduled daily runs
- ✅ Parallel test execution
- ✅ Automatic retry on failures
- ✅ Test artifacts storage
- ✅ HTML report generation

### GitHub Actions Status

View the `.github/workflows/tests.yml` file for the complete CI/CD configuration.

### Running in CI

The tests automatically run in CI with:
- Headless mode
- Retry on failure (2 attempts)
- Artifact upload for reports
- Test result summaries

## ✍️ Writing Custom Tests

### 1. Create a Page Object

```typescript
// templates/generic/pages/mypage.page.ts
import { Page, Locator } from '@playwright/test';

export class MyPage {
  readonly page: Page;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('button[type="submit"]');
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
```

### 2. Write a Test

```typescript
// templates/generic/tests/mytest.spec.ts
import { test, expect } from '@playwright/test';
import { MyPage } from '../pages/mypage.page';

test.describe('My Feature', () => {
  test('should perform an action', async ({ page }) => {
    const myPage = new MyPage(page);
    await page.goto('https://myapp.com');
    await myPage.clickSubmit();
    await expect(page).toHaveURL(/success/);
  });
});
```

### 3. Run Your Test

```bash
npx playwright test templates/generic/tests/mytest.spec.ts
```

## 🎯 Best Practices

### ✅ DO's
- Use Page Object Model for maintainability
- Keep tests independent and atomic
- Use meaningful test descriptions
- Implement proper waits and assertions
- Use test fixtures for reusable setup
- Group related tests with `describe` blocks
- Use environment variables for sensitive data
- Take screenshots on failure
- Use proper selectors (data-testid preferred)

### ❌ DON'Ts
- Don't use hard-coded waits
- Don't share state between tests
- Don't use CSS selectors that might change
- Don't skip error handling
- Don't ignore flaky tests
- Don't commit sensitive data

## 🐛 Troubleshooting

### Common Issues and Solutions

**Issue**: Tests fail with timeout errors
```bash
# Solution: Increase timeout in config
use: {
  navigationTimeout: 60000,
  actionTimeout: 30000,
}
```

**Issue**: Browser not installed
```bash
# Solution: Install browsers
npx playwright install
```

**Issue**: Tests work locally but fail in CI
```bash
# Solution: Ensure CI mode is enabled
CI=true npm test
```

**Issue**: Cannot find elements
```bash
# Solution: Use Playwright Inspector
npx playwright test --debug
```

## 📊 Test Reports

### HTML Report
Interactive HTML report with:
- Test results overview
- Execution time
- Screenshots on failure
- Video recordings
- Trace viewer

### JSON Report
Machine-readable format for:
- CI/CD integration
- Custom dashboards
- Test analytics

### JUnit Report
XML format for:
- Jenkins integration
- Test management tools
- CI/CD pipelines

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear commit messages
- Add tests for new features
- Update documentation
- Follow existing code style
- Ensure all tests pass

## 📚 Resources

### Documentation
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Learning Resources
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [API Testing with Playwright](https://playwright.dev/docs/api-testing)

### Community
- [Playwright Discord](https://discord.com/invite/playwright-807756831384403968)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)
- [GitHub Discussions](https://github.com/playwright-community/playwright-go/discussions)

## 📈 Project Stats

- **Total Tests**: 50+
- **Test Sites**: 3 demo sites + generic template
- **Browsers Supported**: Chrome, Firefox, Safari
- **Average Execution Time**: ~2-3 minutes per suite
- **Code Coverage**: Example implementations for common patterns

## 🔐 Security

- Never commit `.env` files with real credentials
- Use GitHub Secrets for CI/CD
- Rotate test credentials regularly
- Sanitize test data
- Keep dependencies updated

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [Wilker Augusto](https://github.com/wilkeraug)

## 🙏 Acknowledgments

- Playwright team for the excellent framework
- Demo site maintainers (SauceDemo, Herokuapp, ReqRes)
- Community contributors
- You for using this framework!

<div align="center">
  
**Built with ❤️ using [Playwright](https://playwright.dev)**

⭐ Star this repository if you find it helpful!

</div>