"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dataset;

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      dataset
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get or set a value on the passed element with the passed name
 *
 * @param       {HTMLElement}       elm         The HTMLElement on which to set to value
 * @param       {String}            key         The key to set the data
 * @param       {Mixed}             [key=null]  The value to set
 * @return      {Mixed}                         Return the value wanted or setted
 *
 * @example     js
 * import dataset from '@coffeekraken/sugar/js/dom/dataset';
 * dataset(myCoolElement, 'hello', 'world'); // => 'world';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dataset(elm, key, value = null) {
  if (!elm.getAttribute) return;

  if (!value) {
    return elm.dataset[key] || elm.getAttribute("data-" + (0, _uncamelize.default)(key));
  } else {
    // try to set the value
    let dataset = elm.dataset;

    if (dataset) {
      elm.dataset[key] = value;
    } else {
      // set the data through setAttribute
      // cause no support for dataset
      elm.setAttribute("data-" + (0, _uncamelize.default)(key), value);
    } // return the element


    return elm;
  }
}

module.exports = exports.default;