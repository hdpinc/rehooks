require('dotenv').config()
process.env.CHROME_BIN = require('puppeteer').executablePath()

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
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-browserstack-launcher',
      'karma-sauce-launcher',
      'karma-chrome-launcher',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['webpack'],
      '**/*.tsx': ['webpack'],
    },

    webpack: {
      mode: 'production',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
    },

    sauceLabs: {
      name: '@jmdc/rehooks browser testing',
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
    },

    // global config of your BrowserStack account
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },

    // define browsers
    customLaunchers: {
      sl_IE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
        platform: 'Windows 10',
      },
      sl_Edge: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        version: '18',
        platform: 'Windows 10',
      },
      bs_IE11: {
        base: 'BrowserStack',
        browser: 'IE',
        browser_version: '11',
        os: 'WINDOWS',
        os_version: '10',
      },
      bs_Edge: {
        base: 'BrowserStack',
        browser: 'Edge',
        browser_version: '18.0',
        os: 'WINDOWS',
        os_version: '10',
      },
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
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
