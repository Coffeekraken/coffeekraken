"use strict";

var _backgroundImageLoaded = _interopRequireDefault(require("../backgroundImageLoaded"));

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.backgroundImageLoaded', () => {
  document.body.innerHTML = "\n    <style>\n      .testing {\n        background-image: url('/test.jpg');\n      }\n    </style>\n    <div id=\"testing\" class=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var isLoaded = false,
      isError = false;
  var promise = (0, _backgroundImageLoaded.default)($elm).then(() => {
    isLoaded = true;
  }).catch(e => {
    isError = true;
  });
  (0, _dispatchEvent.default)(promise.__$img, 'load');
  it('Should detect the background image loading complete state', () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});