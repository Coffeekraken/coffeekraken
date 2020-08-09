"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPlainObject;

/**
 * @name                          toPlainObject
 * @namespace           js.class
 * @type                          Function
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @example             js
 * import toPlainObject from '@coffeekraken/sugar/js/class/toPlainObject';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function toPlainObject(theClass) {
  var originalClass = theClass || {};
  var keys = Object.getOwnPropertyNames(originalClass);
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key];
    return classAsObj;
  }, {});
}

module.exports = exports.default;