const webpack = require('webpack')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    files: ['./karma-entry.ts'],
    preprocessors: {
      '**/*.ts': ['webpack'],
      '**/*.tsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'babel-loader',
          },
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.test': true,
        }),
      ],
    },
    customLaunchers: {
      ie_no_addons: {
        base: 'IE',
        flags: ['-extoff'],
      },
    },
  })
}
