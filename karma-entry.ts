// 順番が重要。polyfill の読み込みが先!
// ===============================
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// ===============================
import './enzyme'

const testsContext = require.context('./packages/', true, /e2e\/.*spec\.tsx?$/)

testsContext.keys().forEach(testsContext)
