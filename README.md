# 🎭 Playwright Test Automation Framework

A comprehensive, production-ready test automation framework built with Playwright and TypeScript, following industry best practices.

## 🚀 Features

- ✅ **Page Object Model (POM)** architecture
- ✅ **TypeScript** for type safety
- ✅ **Cross-browser** testing (Chrome, Firefox, Safari, Edge)
- ✅ **Mobile** testing support
- ✅ **API** testing capabilities
- ✅ **Accessibility** testing with axe-core
- ✅ **Visual regression** testing
- ✅ **Performance** testing
- ✅ **Parallel execution** with sharding
- ✅ **Retry mechanism** for flaky tests
- ✅ **Multiple reporters** (HTML, JSON, JUnit)
- ✅ **CI/CD integration** with GitHub Actions
- ✅ **Custom fixtures** for reusable setup
- ✅ **Environment configuration** support
- ✅ **Comprehensive test data management**
- ✅ **Built-in helpers and utilities**

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- VS Code (recommended)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd playwright-test-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🏃‍♂️ Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
# End-to-end tests
npm run test:e2e

# API tests
npm run test:api

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:performance

# Visual regression tests
npm run test:visual
```

### Specific Browsers
```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# Safari only
npm run test:webkit

# Mobile browsers
npm run test:mobile
```

### Debug Mode
```bash
# Debug with Playwright Inspector
npm run test:debug

# UI Mode (recommended for debugging)
npm run test:ui

# Headed mode (see browser)
npm run test:headed
```

### Generate Tests
```bash
# Open Playwright codegen
npm run codegen
```

## 📁 Project Structure

```
playwright-test-project/
├── .github/
│   └── workflows/
│       └── playwright.yml              # CI/CD pipeline
├── tests/
│   ├── e2e/                           # End-to-end tests
│   │   ├── auth/
│   │   │   └── login.spec.ts
│   │   ├── checkout/
│   │   │   └── purchase-flow.spec.ts
│   │   └── home/
│   │       └── homepage.spec.ts
│   ├── api/                           # API tests
│   │   └── users-api.spec.ts
│   └── accessibility/                 # Accessibility tests
│       └── a11y.spec.ts
├── pages/                             # Page Object Model
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── home.page.ts
│   └── checkout.page.ts
├── fixtures/                          # Test fixtures
│   ├── base.fixture.ts
│   └── auth.fixture.ts
├── utils/                             # Utility functions
│   ├── helpers.ts
│   ├── test-data.ts
│   └── constants.ts
├── test-data/                         # Test data files
│   ├── users.json
│   └── products.json
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # This file
```

## 🎯 Best Practices Implemented

### 1. Page Object Model
All page interactions are encapsulated in page objects for better maintainability:

```typescript
// pages/login.page.ts
export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 2. Custom Fixtures
Reusable test setup with custom fixtures:

```typescript
// fixtures/base.fixture.ts
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});
```

### 3. Test Organization
Tests are organized by feature and type:
- `tests/e2e/` - End-to-end user journeys
- `tests/api/` - API endpoint testing
- `tests/accessibility/` - WCAG compliance tests

### 4. Data Management
Centralized test data management:
- Environment variables for sensitive data
- JSON files for static test data
- Helper functions for dynamic data generation

### 5. Parallel Execution
Tests run in parallel by default with configurable workers:
```bash
npm run test:parallel  # 4 workers
npm run test:serial    # 1 worker
```

## 📊 Reporting

### View HTML Report
```bash
npm run report
```

### Report Formats
- **HTML**: Interactive report with screenshots/videos
- **JSON**: Machine-readable results
- **JUnit**: CI/CD integration
- **Line**: Console output

### Report Locations
- HTML: `playwright-report/`
- JSON: `reports/results.json`
- JUnit: `reports/junit.xml`

## 🐛 Debugging

### VS Code Extension
1. Install "Playwright Test for VSCode"
2. Click the green arrow next to any test
3. Set breakpoints for debugging

### Trace Viewer
```bash
# View trace for failed tests
npm run trace
```

### UI Mode
```bash
# Interactive test runner
npm run test:ui
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPassword123!
```

### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Timeouts
- Retries
- Screenshots/Videos
- Parallel workers
- Browser settings

## 🚀 CI/CD Integration

### GitHub Actions
The project includes a comprehensive GitHub Actions workflow that:
- Runs tests on push/PR to main/develop
- Executes tests in parallel with sharding
- Uploads artifacts (reports, videos, traces)
- Sends notifications on failure
- Runs performance tests
- Executes visual regression tests

### Running in CI
```yaml
- name: Run Playwright tests
  run: npm test
  env:
    CI: true
    BASE_URL: ${{ secrets.BASE_URL }}
```

## 📈 Performance Testing

Monitor key performance metrics:
- Page Load Time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

```bash
npm run test:performance
```

## ♿ Accessibility Testing

Automated WCAG 2.1 AA compliance testing:
- Color contrast validation
- ARIA attributes verification
- Keyboard navigation testing
- Screen reader compatibility

```bash
npm run test:a11y
```

## 🎨 Visual Regression Testing

Catch visual bugs with screenshot comparison:

```bash
# Update baseline screenshots
npm run test:visual:update

# Run visual tests
npm run test:visual
```

## 🤝 Contributing

1. Create a feature branch
2. Write tests following existing patterns
3. Ensure all tests pass
4. Submit a pull request

### Writing Tests

```typescript
import { test, expect } from '@fixtures/base.fixture';

test.describe('Feature Name', () => {
  test('should perform action', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.goto();
    
    // Act
    await loginPage.login('user@example.com', 'password');
    
    // Assert
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## 🛡️ Security

- Never commit `.env` files
- Use secrets in CI/CD
- Sanitize test data
- Regular dependency updates

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📝 License

[Your License Here]

## 👥 Team

[Your Team Information]

## 📞 Support

For questions or issues:
- Create an issue in GitHub
- Contact: [your-email@example.com]

---

Built with ❤️ using Playwright