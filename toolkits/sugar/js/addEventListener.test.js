"use strict";

var _addEventListener = _interopRequireDefault(require("../addEventListener"));

var _dispatchEvent = _interopRequireDefault(require("../dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.addEventListener', () => {
  var isCallbackCalled = false,
      isThenCalled = false,
      hasBeenReleased = false,
      hasBeenCanceled = false;
  var clickCount = 0;
  document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var listener = (0, _addEventListener.default)($elm, 'click', event => {
    isCallbackCalled = true;
  }).on('click', event => {
    isThenCalled = true;
    clickCount++;
  }).finally(event => {
    hasBeenReleased = true;
  }).on('cancel', event => {
    hasBeenCanceled = true;
  });
  (0, _dispatchEvent.default)($elm, 'click'); // release the listener

  listener.cancel();
  setTimeout(() => {
    (0, _dispatchEvent.default)($elm, 'click');
  });
  it('Should have register the listener correctly and called as expected', done => {
    expect(isCallbackCalled).toBe(true);
    expect(isThenCalled).toBe(true);
    expect(clickCount).toBe(1);
    expect(hasBeenCanceled).toBe(true);
    done();
  });
});