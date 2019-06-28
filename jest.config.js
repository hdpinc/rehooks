const path = require('path')

module.exports = {
  restoreMocks: true,
  setupFiles: [path.resolve(__dirname, 'jest-setup.js')],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  verbose: true,
}
