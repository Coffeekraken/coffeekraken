"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClassOnAnimationEnd;

var _addEventListenerOnce = _interopRequireDefault(require("./addEventListenerOnce"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      removeClassOnAnimationEnd
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    elm    The element to take care of
 * @param    {String|Array}    class    The class or classes (Array) to remove
 * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @example    js
 * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
 * removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function removeClassOnAnimationEnd($elm, cls) {
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    // listen for animation end on the element just once
    (0, _addEventListenerOnce.default)($elm, 'animationend', e => {
      if (!Array.isArray(cls)) cls = [cls]; // remove the cls

      cls.forEach(_cls => {
        $elm.classList.remove(_cls);
      }); // resolve the process

      resolve(e);
    });
  });
}

module.exports = exports.default;