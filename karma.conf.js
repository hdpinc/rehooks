const webpack = require('webpack')

// Karma configuration
// Generated on Thu Sep 19 2019 17:43:04 GMT+0900 (GMT+09:00)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: ['./karma-entry.ts'],

    // list of files / patterns to exclude
    exclude: [],

    //plugins
    plugins: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['webpack'],
      '**/*.tsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'babel-loader',
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.test': true,
        }),
      ],
    },

    // define browsers
    customLaunchers: {
      ie_no_addons: {
        base: 'IE',
        flags: ['-extoff'],
      },
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // 対象ブラウザはコマンドラインから与える
    browsers: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
