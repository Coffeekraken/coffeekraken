"use strict";
// @ts-nocheck
// @shared
/**
 * @name                              flatten
 * @namespace           sugar.js.object
 * @type                              Function
 * @stable
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {String}                          [separation="."]          The separation character to use for preperty names
 * @param 							{Boolean}													[flattenArrays=false] 		Specify if you want to flatten arrays or not
 * @return              {Object}                                                    The flatten object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import flatten from '@coffeekraken/sugar/js/object/flatten';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function flatten(object, separation = '.', flattenArrays = false) {
    const toReturn = {};
    for (const i in object) {
        if (!object.hasOwnProperty(i))
            continue;
        if ((Array.isArray(object[i]) && flattenArrays) ||
            (!Array.isArray(object[i]) && typeof object[i]) == 'object') {
            const flatObject = flatten(object[i], separation, flattenArrays);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + separation + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = object[i];
        }
    }
    return toReturn;
}
module.exports = flatten;
