"use strict";

var _scriptLoaded = _interopRequireDefault(require("../scriptLoaded"));

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.scriptLoaded', () => {
  document.head.innerHTML = "\n    <script type=\"text/javascript\" src=\"src/data/tests/testing.js\"></script>\n  ";
  var $elm = document.head.querySelector('script');
  var isLoaded = false,
      isError = false;
  (0, _scriptLoaded.default)($elm).then(() => {
    isLoaded = true;
  }).catch(e => {
    isError = true;
  });
  it('Should detect the script loading complete state', () => {
    $elm.onload();
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});