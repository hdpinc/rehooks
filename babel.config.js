// https://github.com/facebook/jest/issues/8365
// jest 用ファイル
// jest が .babelrc に対応してないのでファイル名は babel.config.js とする

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
}
