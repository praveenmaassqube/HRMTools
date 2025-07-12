const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. Entry point: Where Webpack starts building your dependency graph
  entry: './src/index.js',

  // 2. Output: Where Webpack outputs the bundles
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Name of the bundled JS file
    publicPath: '/', // Important for React Router and refreshing pages
  },

  // 3. Module rules: How to handle different file types
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Apply this rule to .js and .jsx files
        exclude: /node_modules/, // Don't process files in node_modules
        use: {
          loader: 'babel-loader', // Use babel-loader
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'], // Use React and env presets
          },
        },
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule to image files
        type: 'asset/resource', // Webpack 5 built-in asset module
      },
    ],
  },

  // 4. Plugins: Extend Webpack's capabilities
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file name
    }),
  ],

  // 5. Resolve extensions: Allow importing files without specifying extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 6. Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3008, // Port for your development server
    open: true, // Open browser automatically
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // Important for React Router so direct URL access works
  },

  // 7. Mode: 'development' or 'production'
  // 'development' provides more verbose output and faster builds
  // 'production' enables optimizations like minification
  mode: 'development', // Change to 'production' for production builds
};