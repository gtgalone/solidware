const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: './src/client.jsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'client.js',
      publicPath: '/dist/',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        shared: path.join(__dirname, 'shared'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, 'src/index.html'),
      }),
    ],
  }, {
    name: 'server',
    target: 'node',
    entry: './src/server.jsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/dist/',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        shared: path.join(__dirname, 'shared'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
  },
];
