"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

/**
 * @name                              flatten
 * @namespace                         sugar.js.object
 * @type                              Function
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {String}                          [separation="."]          The separation character to use for preperty names
 * @param 							{Boolean}													[flattenArrays=false] 		Specify if you want to flatten arrays or not
 * @return              {Object}                                                    The flatten object
 *
 * @example             js
 * import flatten from '@coffeekraken/sugar/js/object/flatten';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function flatten(object, separation = '.', flattenArrays = false) {
  let toReturn = {};

  for (let i in object) {
    if (!object.hasOwnProperty(i)) continue;

    if (Array.isArray(object[i]) && flattenArrays || (!Array.isArray(object[i]) && typeof object[i]) == 'object') {
      let flatObject = flatten(object[i], separation, flattenArrays);

      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + separation + x] = flatObject[x];
      }
    } else {
      toReturn[i] = object[i];
    }
  }

  return toReturn;
}

module.exports = exports.default;