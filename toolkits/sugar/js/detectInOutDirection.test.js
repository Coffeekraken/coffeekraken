"use strict";

var _detectInOutDirection = _interopRequireDefault(require("../detectInOutDirection"));

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.detectInOutDirection', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  var isInTriggered = false,
      isOutTriggered = false,
      isThenTriggered = false;
  (0, _detectInOutDirection.default)($elm).on('in', direction => {
    isInTriggered = true;
  }).on('out', direction => {
    isOutTriggered = true;
  }).then(value => {
    isThenTriggered = true;
  });
  (0, _dispatchEvent.default)($elm, 'mouseenter');
  (0, _dispatchEvent.default)($elm, 'mouseleave');
  it('Should have trigger the "in" stack correctly', () => {
    setTimeout(() => {
      expect(isInTriggered).toBe(true);
    });
  });
  it('Should have trigger the "out" stack correctly', () => {
    setTimeout(() => {
      expect(isOutTriggered).toBe(true);
    });
  });
  it('Should have trigger the "then" stack correctly', () => {
    setTimeout(() => {
      expect(isThenTriggered).toBe(true);
    });
  });
});