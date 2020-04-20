"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

/**
 * @name                map
 * @namespace           sugar.js.object
 * @type                Function
 * 
 * This is the same function as the "Array.map" but for objects. It will iterate over all the properties
 * of the passed object and pass the value to your process function. It will then save the property
 * with your processed value
 * 
 * @param           {Object}            object          The object to process
 * @param           {Function}          processor       The processor function that will take as parameters the current property value and the property name
 * @return          {Object}                            The processed object
 * 
 * @example         js
 * import map from '@coffeekraken/sugar/js/object/map';
 * const myObject = {
 *    hello: 'world',
 *    cat: 'Nelson'
 * };
 * map(myObject, (value, prop) => {
 *    return prop === 'hello' ? 'universe' : value;
 * });
 * {
 *    hello: 'universe',
 *    cat: 'Nelson'
 * }
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function map(object, processor) {
  Object.keys(object).forEach(prop => {
    object[prop] = processor(object[prop], prop);
  });
  return object;
}

module.exports = exports.default;