module.exports = {
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  verbose: true,
  transformIgnorePatterns: ['/node_modules/(?!pretty-format).+\\.js$'],
}
