const path = require('path')

module.exports = {
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  verbose: true,
}
