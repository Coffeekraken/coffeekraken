"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenAttribute;

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _observeAttributes = _interopRequireDefault(require("./observeAttributes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenAttribute
 * @namespace           js.dom
 * @type      Function
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @example 	js
 * import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
 * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenAttribute(elm, attrName, checkFn) {
  if (checkFn === void 0) {
    checkFn = null;
  }

  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      var value = (0, _autoCast.default)(elm.getAttribute(attrName));

      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    var obs = (0, _observeAttributes.default)(elm).then(mutation => {
      if (mutation.attributeName === attrName) {
        var _value = (0, _autoCast.default)(mutation.target.getAttribute(mutation.attributeName));

        if (checkFn && checkFn(_value, mutation.oldValue)) {
          resolve(_value);
          obs.cancel();
        } else if (!checkFn) {
          resolve(_value);
          obs.cancel();
        }
      }
    });
  });
}

module.exports = exports.default;