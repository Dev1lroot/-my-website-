const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './source.js', // Entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use this HTML file as a template
    }),
  ],
  mode: 'development', // Set mode to 'development' or 'production'
};