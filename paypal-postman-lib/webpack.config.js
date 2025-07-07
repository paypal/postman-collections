const path = require('path');

module.exports = {
  entry: './dist/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'paypal-postman-lib.min.js',
    library: 'PayPalPostmanUtils',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};