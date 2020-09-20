"use strict";

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.dispatchEvent', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  var isDetected = false;
  $elm.addEventListener('coco', e => {
    if (!e.detail.custom) return;
    isDetected = true;
  });
  (0, _dispatchEvent.default)($elm, 'coco', {
    custom: true
  });
  it('Should detect the dispatched custom event with custom data attached', () => {
    expect(isDetected).toBe(true);
  });
});