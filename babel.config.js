module.exports = {
  presets: [
    ['@babel/preset-env', { corejs: 3, useBuiltIns: 'entry' }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
}
