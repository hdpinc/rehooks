const path = require('path')
const webpack = require('webpack')

module.exports = function(config) {
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
            // https://github.com/FormidableLabs/enzyme-matchers/issues/329
            test: /\.js$/,
            use: 'babel-loader',
            include: [
              path.resolve(__dirname, 'node_modules/enzyme-matchers'),
              path.resolve(__dirname, 'node_modules/jasmine-enzyme'),
            ],
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
