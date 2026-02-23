# Testing Guide

This project includes comprehensive unit tests for all React components, contexts, and custom hooks.

## Setup

Before running tests, you need to install the testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- AddToCartButton.test.js
```

### Run tests for specific directory
```bash
npm test -- components
npm test -- context
npm test -- hooks
```

## Test Structure

### Components Tests (`src/components/__tests__/`)
- **AddToCartButton.test.js** - Tests cart functionality, session handling, and UI states
- **AdminProductForm.test.js** - Tests form validation, submission, and category loading
- **Advertisement.test.js** - Tests promo display and styling
- **Footer.test.js** - Tests links, copyright, and GitHub integration
- **Header.test.js** - Tests branding and navigation
- **LoginButton.test.js** - Tests login link and styling
- **LogoutButton.test.js** - Tests logout functionality and cart clearing
- **NavBar.test.js** - Tests navigation, user session handling, and admin features
- **ProductCard.test.js** - Tests product display, pricing, and links
- **ProductCategorySelector.test.js** - Tests category loading, error states, and selection
- **ProductList.test.js** - Tests product grid rendering and data handling

### Context Tests (`src/context/__tests__/`)
- **CartContext.test.js** - Tests cart operations, localStorage integration, and calculations
- **SessionContext.test.js** - Tests session management and provider functionality

### Hook Tests (`src/hooks/__tests__/`)
- **useDebounce.test.js** - Tests debouncing functionality with various scenarios
- **useFetch.test.js** - Tests API fetching, error handling, and loading states
- **useFetchTobi.test.js** - Tests alternative fetch implementation with different error handling

## Testing Patterns

### Component Testing
- Uses React Testing Library for user-centric testing
- Mocks child components when testing parent components
- Tests both happy paths and error states
- Validates styling classes and accessibility

### Context Testing
- Tests provider functionality and error boundaries
- Mocks localStorage for cart context
- Tests context value propagation and updates

### Hook Testing
- Uses renderHook from React Testing Library
- Tests various input scenarios and edge cases
- Mocks external dependencies (fetch, timers)
- Tests cleanup and unmounting behavior

## Key Features Tested

### Cart Functionality
- Adding items to cart
- Incrementing quantities
- Removing items
- Clearing cart
- Total price calculation
- localStorage persistence

### User Session Management
- Login/logout states
- Admin privilege handling
- Session context propagation

### Product Management
- Product display and formatting
- Category filtering
- Search functionality
- Admin product forms

### API Integration
- Data fetching
- Error handling
- Loading states
- URL changes and refetching

### UI/UX
- Responsive design classes
- Hover and active states
- Loading indicators
- Error messages

## Best Practices

1. **Test user behavior, not implementation details**
2. **Mock external dependencies** (API calls, localStorage)
3. **Test both success and error scenarios**
4. **Use descriptive test names**
5. **Keep tests focused and isolated**
6. **Test accessibility when relevant**

## Troubleshooting

### Common Issues

1. **PowerShell Execution Policy**: If you encounter script execution errors, run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Module Import Errors**: Ensure Jest configuration is set up correctly for path aliases (`@/`)

3. **Async Test Timeouts**: Use proper async/await patterns and Jest's fake timers when needed

4. **Mock Cleanup**: Always clear mocks in beforeEach to prevent test interference

### Debugging

Use `console.log` or `screen.debug()` to inspect component state during tests. For hook testing, you can log the hook result to see current state.
