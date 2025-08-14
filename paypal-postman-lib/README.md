# PayPal Postman Library

A TypeScript/JavaScript library of helper utilities designed specifically for PayPal's public Postman workspace. This library provides reusable functions that can be used in Postman pre-request and test scripts to streamline PayPal API testing and development workflows.

## Features

- **OAuth2 Token Management**: Automated access token generation, validation, and refresh
- **Environment Detection**: Sandbox vs. production environment identification
- **Debug Utilities**: PayPal Debug ID extraction for troubleshooting
- **JWT Utilities**: JWT creation and Base64URL encoding for PayPal authentication flows
- **Auth Assertion Generation**: Support for PayPal's auth assertion patterns

## Installation & Setup

### 1. Build the Library

```bash
git clone <repository-url>
cd paypal-postman-lib
npm install
npm run build
```

### 2. Add to Postman Collection

1. Copy the contents of `dist/paypal-postman-lib.min.js`
2. In your Postman collection, go to **Variables** tab
3. Create a new collection variable named `paypal_postman_scripts`
4. Paste the minified library code as the value

### 3. Use in Postman Scripts

Add this line at the top of your pre-request or test scripts:

```javascript
eval(pm.collectionVariables.get("paypal_postman_scripts"));
```

Then use the library functions:

```javascript
// Check if access token needs refresh
if (this.PayPalPostmanUtils.needsNewAccessToken({
  accessTokenVar: 'access_token',
  accessTokenExpiryVar: 'access_token_expiry', 
  forClientIdVar: 'for_client_id',
  clientIdVar: 'client_id'
})) {
  // Refresh the token
  this.PayPalPostmanUtils.refreshAccessToken({
    accessTokenVar: 'access_token',
    accessTokenExpiryVar: 'access_token_expiry',
    forClientIdVar: 'for_client_id', 
    clientIdVar: 'client_id',
    clientSecretVar: 'client_secret',
    baseUrlVar: 'base_url'
  });
}

// Get PayPal Debug ID from response
const debugId = this.PayPalPostmanUtils.getPayPalDebugId();

// Check if running in sandbox
const isSandbox = this.PayPalPostmanUtils.isSandbox();
```

## Available Functions

### Authentication Functions

- `needsNewAccessToken(config)` - Checks if access token needs refresh
- `refreshAccessToken(config, callback?)` - Refreshes OAuth2 access token
- `storeAccessToken(response, config)` - Stores access token from OAuth response

### Utility Functions

- `isSandbox()` - Returns true if using PayPal sandbox environment
- `getPayPalDebugId()` - Extracts PayPal-Debug-Id from response headers
- `base64Url(string)` - Encodes string to Base64URL format
- `getJWT(iss, data, alg, secret?)` - Creates JWT tokens
- `getAuthAssertionFor(clientId, payerId)` - Generates auth assertion for PayPal flows

## Development

### Build Commands

```bash
npm run build      # Build TypeScript and create minified bundle
npm run dev        # Watch mode for development
npm run typecheck  # Type checking only
npm run clean      # Clean dist directory
```

### Project Structure

```
src/
├── index.ts       # Main library exports
├── auth.ts        # OAuth2 and authentication functions
├── utils.ts       # Utility functions
└── types.ts       # TypeScript type definitions
```

## License

MIT License - see LICENSE file for details.

## Contributing

This library is designed specifically for PayPal's public Postman workspace. Contributions should focus on helper functions that would be commonly needed across multiple PayPal API collections.
