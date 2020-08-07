"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inViewportStatusChange;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

var _whenInViewport = _interopRequireDefault(require("./whenInViewport"));

var _whenOutOfViewport = _interopRequireDefault(require("./whenOutOfViewport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name      inViewportStatusChange
 * @namespace           js.dom
 * @type      Function
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						elm  		The element to monitor
 * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
 *
 * @example  	js
 * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
 * inViewportStatusChange(myElm).enter($elm => {
 *    // do something...
 * }).exit($elm => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inViewportStatusChange($elm) {
  let isCanceled = false;
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    function _whenIn() {
      (0, _whenInViewport.default)($elm).then(() => {
        if (isCanceled) return;
        trigger('enter', $elm);

        _whenOut();
      });
    }

    function _whenOut() {
      (0, _whenOutOfViewport.default)($elm).then(() => {
        if (isCanceled) return;
        trigger('exit', $elm);

        _whenIn();
      });
    } // if not in viewport at start


    if (!(0, _isInViewport.default)($elm)) {
      _whenOut();
    } else {
      _whenIn();
    }
  }, {
    stacks: ['enter', 'exit']
  }).on('cancel,finally', () => {
    isCanceled = true;
  }).start();
}

module.exports = exports.default;