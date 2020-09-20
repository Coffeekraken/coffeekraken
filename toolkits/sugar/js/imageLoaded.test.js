"use strict";

var _imageLoaded = _interopRequireDefault(require("../imageLoaded"));

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.imageLoaded', () => {
  document.head.innerHTML = "\n    <img src=\"src/data/tests/testing.jpg\" />\n  ";
  var $elm = document.head.querySelector('img');
  var isLoaded = false,
      isError = false;
  (0, _imageLoaded.default)($elm).then(() => {
    isLoaded = true;
  }).catch(e => {
    isError = true;
  });
  (0, _dispatchEvent.default)($elm, 'load');
  it('Should detect the image loading complete state', () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});