# PayPal Postman Scripts Library

## Overview

A lightweight JavaScript library of reusable helper utilities for PayPal Postman collections.  
Centralizes shared pre-request and test script code to avoid duplication across collections.

## Features

- Helper functions for managing OAuth2 access tokens in Postman
- Utilities for working with PayPal environments and authentication
- Designed for easy integration with Postman scripts

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/YOUR-USERNAME/paypal-postman-scripts.git
cd paypal-postman-scripts
npm install
```

## Usage

You can use the minified bundle in Node.js or include it in your Postman scripts.

### Node.js Example

```javascript
const paypalPostman = require('./dist/paypal-postman-scripts.min.js');

// Example usage
paypalPostman.needsNewAccessToken({
  accessTokenVar: 'access_token',
  accessTokenExpiryVar: 'access_token_expiry',
  forClientIdVar: 'for_client_id',
  clientIdVar: 'client_id'
});
```

### In Postman

Copy relevant functions from the `dist/paypal-postman-scripts.min.js` or source files into your Postman pre-request or test scripts.  
The library expects the `pm` object provided by Postman to be available.

## Development

To build and minify the library, run:

```sh
npm run build
```

This will create a minified version of the library in the `dist` directory.
