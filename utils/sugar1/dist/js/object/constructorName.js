"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constructorName;

/**
 * @name        constructorName
 * @namespace       sugar.js.object
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
  let funcNameRegex = /function (.{1,})\(/;
  const res = funcNameRegex.exec(obj.toString());
  if (res && res[1]) return res[1];
  let results = funcNameRegex.exec(obj.constructor.toString());
  return results && results.length > 1 ? results[1] : "";
}

module.exports = exports.default;