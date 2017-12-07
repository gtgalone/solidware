const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: ['whatwg-fetch', './src/client.jsx'],
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
    plugins: [
      new StatsPlugin('stats.json', {
        chunkModules: true,
        modules: true,
        chunks: true,
        exclude: [/node_modules[\\/]react/],
      }),
    ],
  },
];
