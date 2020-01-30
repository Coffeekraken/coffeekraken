const __isJson = require('../is/json');
/**
 * @name        toString
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @return    {String}    The resulting string
 *
 * @example    js
 * const toString = require('@coffeekraken/sugar/node/string/toString');
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function(value) {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'symbol' || typeof value === 'typedArray' || typeof value === 'date' || typeof value === 'color') {
    return value.toString();
  } else if (typeof value === 'object' || typeof value === 'array' || __isJson(value)) {
    return JSON.stringify(value);
  } else if (typeof value === 'boolean') {
    if (value) return "true";
    else return "false";
  } else if (typeof value === 'function') {
    return "" + value;
  } else if (value instanceof RegExp) {
    return value.toString();
  } else if (typeof value === 'number') {
    return value.toString();
  } else if (value === null) {
    return "";
  } else if (value === undefined) {
    return "undefined";
  } else {
    let returnVal;
    try {
      returnVal = JSON.stringify(value);
    } catch (e) {
      try {
        returnVal = value.toString();
      } catch (e) {
        return value;
      }
    }
    return returnVal;
  }
}
