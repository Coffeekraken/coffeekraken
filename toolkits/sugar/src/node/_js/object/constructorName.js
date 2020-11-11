"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constructorName;

/**
 * @name        constructorName
 * @namespace           sugar.js.object
 * @type      Function
 *
 * Return the constructor name of the passed object
 *
 * @param 		{Object} 			obj 		The object to get the constructor name from
 * @return 		{String}						The constructor name
 *
 * @example 	js
 * import constructorName from '@coffeekraken/sugar/js/object/constructorName';
 * class MyCoolClass {
 * 		// class implementation...
 * }
 * const myObj = new MyCoolClass();
 * console.log(constructorName(myObj)); => MyCoolClass
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function constructorName(obj) {
  return obj.constructor && obj.constructor.name ? obj.constructor.name : null;
}

module.exports = exports.default;