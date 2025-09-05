# Playwright Test Automation Project

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- VS Code (recommended)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd playwright-test-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in UI mode
npm run test:ui

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run specific test suite
npm run test:e2e
npm run test:api
npm run test:a11y

# Debug tests
npm run test:debug

# Generate test code
npm run codegen

npm run report
```

### View Test Reports
```
npm run report
```

### 📁 Project Structure

- ```tests/``` - Test files organized by type (e2e, api, accessibility)
- ```pages/``` - Page Object Model classes
- ```fixtures/``` - Custom test fixtures
- ```utils/``` - Helper functions and utilities
- ```test-data/``` - Test data files

### 🎯 Best Practices

1. **```Page Object Model:```** All page interactions through page objects
2. **```Test Isolation:```** Each test is independent
3. **```Parallel Execution:```** Tests run in parallel by default
4. **```Retry Logic:```** Failed tests retry in CI
5. **```Comprehensive Reporting:```** Multiple report formats
6. **```Cross-browser Testing:```** Chrome, Firefox, Safari, and mobile
7. **```Accessibility Testing:```** Built-in a11y tests
8. **```API Testing:```** Separate API test suite
9. **```Environment Variables:```** Sensitive data in .env files
10. **```CI/CD Integration:```** GitHub Actions workflow included

### 🛠️ VS Code Extensions
Recommended extensions for VS Code:
- Playwright Test for VSCode
- ESLint
- Prettier
- GitLens
- DotENV

### 📝 Writing Tests
#### Example Test Structure
```bash
import { test, expect } from '@fixtures/base.fixture';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### 🔍 Debugging

- Use VS Code Playwright extension for debugging
- Run ```npm run test:debug``` for Playwright Inspector
- Use ```npm run test:ui``` for UI mode
- View traces for failed tests in reports

### 📊 Reporting
Reports are generated in multiple formats:

- HTML Report: playwright-report/
- JUnit XML: reports/junit.xml
- JSON: reports/results.json

### 🤝 Contributing

- Create feature branch
- Write tests
- Ensure all tests pass
- Submit pull request