const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'paypal-postman-lib.min.js',
    library: 'PayPalPostmanUtils',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
  },
  mode: 'production',
};