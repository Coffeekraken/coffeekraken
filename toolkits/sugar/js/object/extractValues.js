"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValues;

/**
 * @name            extractValues
 * @namespace       js.object
 * @type            Function
 *
 * This function take an array of objects and a key name as parameters and return an array containing
 * only the specified object key value.
 *
 * @param       {Array<Object>}         arrayOfObjects            An array of objects as source
 * @param       {String}                keyName                   The key name you want to extract of the objects
 * @return      {Array}                                           An array containing only the values of the property specified
 *
 * @example         js
 * import extractValues from '@coffeekraken/sugar/js/object/extractValues';
 * extractValues([{
 *    hello: 'world',
 *    plop: 'Yes'
 * }, {
 *    hello: 'king',
 *    plop: 'something'
 * }], 'hello'); // => ['world', 'king']
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractValues(arrayOfObjects, keyName) {
  var finalArray = [];
  arrayOfObjects.forEach(object => {
    if (object[keyName] === undefined) return;
    finalArray.push(object[keyName]);
  });
  return finalArray;
}

module.exports = exports.default;