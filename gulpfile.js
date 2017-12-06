const gulp = require('gulp');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

// webpack
function webpackCallback(taskName, callback) {
  return (err, stats) => {
    if (err) {
      notify.onError('build error!');
    }
    if (err) throw new gutil.PluginError(taskName, err);
    if (stats) {
      gutil.log(taskName, stats.toString('minimal'));
    }
    if (callback) {
      callback();
    }
  };
}

// variable
const webpackConfig = require('./webpack.config.js');

// production build
gulp.task('webpack:build', (callback) => {
  const prodConfig = Object.assign(webpackConfig);
  prodConfig.plugins = prodConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  );

  // run
  webpack(prodConfig, webpackCallback('webpack:build', callback));
});

// development build dev server
const devServerConfig = Object.assign({}, webpackConfig);
devServerConfig.cache = false;
devServerConfig.devtool = 'sourcemap';
const devCompiler = webpack([devServerConfig[0], devServerConfig[1]]);

gulp.task('webpack:build-dev', (callback) => {
  devCompiler.run(webpackCallback('webpack:build-dev', callback));
});

// dist
gulp.task('dist', ['styles:dist', 'webpack:build']);

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['dist/server.js', 'dist/client.js'],
    browser: 'google chrome',
    port: 7000,
    reloadDelay: 3000,
  });
});

gulp.task('nodemon', (callback) => {
  let started = false;
  return nodemon({
    script: './server/server.js',
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      callback();
      started = true;
    }
  });
});

// default
gulp.task('default', ['webpack:build-dev'], () => {
  gulp.watch(['src/**/*', 'shared/**/*'], ['webpack:build-dev']);
});
