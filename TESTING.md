# Testing Documentation

This document explains the testing infrastructure and test suites available in this project.

## Test Suites Overview

The project contains three main test suites:

### 1. Webhook Tests (`webhook.test.js`)
Basic endpoint testing that verifies:
- Valid trading signal acceptance
- Required field validation (symbol, action, price)
- Rejection of invalid action types
- Rejection of invalid price values

### 2. Integration Tests (`integration.test.js`)
End-to-end testing that checks:
- Complete trading signal flow
- CORS header verification
- Security headers (Helmet.js)
- Full request-response cycle

### 3. Stress Tests (`stress.test.js`)
Performance and stability testing including:
- Multiple concurrent request handling (50 simultaneous requests)
- Large payload processing
- System stability under load

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## What the Tests Verify

### 1. Security Testing
- CORS functionality
- Security headers presence
- Input validation
- Request payload validation

### 2. Functional Testing
- Webhook endpoint functionality
- Field validation
- Error handling
- Response format verification

### 3. Performance Testing
- Concurrent request handling
- Large payload processing
- System stability

## Test Results

When you run the tests, you'll receive a report showing:
- Number of tests passed/failed
- Test coverage percentage
- Detailed error reports (if any)
- Performance metrics from stress tests

## Adding New Tests

To add new tests:
1. Create a new test file in the `tests` directory
2. Import required modules
3. Write test cases using Jest syntax
4. Run tests to verify

Example of a new test case:
```javascript
describe('New Feature Test', () => {
    test('should perform expected action', async () => {
        // Test setup
        const testData = {
            // Your test data
        };

        // Execute test
        const result = await someFunction(testData);

        // Verify results
        expect(result).toBe(expectedValue);
    });
});
```

## Coverage Reports

The coverage report shows:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

To view detailed coverage:
1. Run `npm run test:coverage`
2. Open `coverage/lcov-report/index.html` in your browser

## Continuous Integration

These tests are designed to run in CI/CD pipelines. Ensure all tests pass before deploying to production by:
1. Running the full test suite
2. Checking the coverage report
3. Reviewing any failed tests
4. Fixing issues before deployment

## Troubleshooting Common Test Issues

1. **Timeouts in Stress Tests**
   - Increase the timeout value in Jest configuration
   - Check system resources
   - Reduce concurrent test load

2. **CORS Test Failures**
   - Verify CORS configuration
   - Check allowed origins
   - Validate headers

3. **Security Header Tests**
   - Ensure Helmet.js is properly configured
   - Verify all required headers
   - Check security policy settings