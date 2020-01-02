// Polyfill for 3rd-party codes
// ===============================
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// ===============================

// These are settings to run jest on karma.
// https://www.kabuku.co.jp/developers/run-jest-on-browsers
// https://github.com/kimamula/jest-karma-angular-demo/blob/master/src/test.ts
window['jest'] = require('jest-mock')
window['expect'] = require('expect')

// This is a polyfill to run @testing-library/react on IE
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = (Element.prototype as any).msMatchesSelector
}

const testsContext = require.context('./src/', true, /.*spec\.tsx?$/)

testsContext.keys().forEach(testsContext)
