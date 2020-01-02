// 順番が重要。polyfill の読み込みが先!
// ===============================
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// ===============================
import './enzyme'

const testsContext = require.context('./src/', true, /.*spec\.tsx?$/)

testsContext.keys().forEach(testsContext)

// These are settings to run jest tests on karma.
// https://www.kabuku.co.jp/developers/run-jest-on-browsers
// https://github.com/kimamula/jest-karma-angular-demo/blob/master/src/test.ts
window['jest'] = require('jest-mock')
window['expect'] = require('expect')

// This is polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = (Element.prototype as any).msMatchesSelector
}
