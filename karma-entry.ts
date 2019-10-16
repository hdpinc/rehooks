// https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md#alternative-karma-webpack-setup
// 順番が重要。polyfill の読み込みが先!
// ===============================
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// ===============================
import './enzyme'

const testsContext = require.context('./packages/', true, /.*spec\.tsx?$/)

testsContext.keys().forEach(testsContext)
