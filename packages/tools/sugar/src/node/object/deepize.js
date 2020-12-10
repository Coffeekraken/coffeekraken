"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const set_1 = __importDefault(require("./set"));
/**
 * @name          deepize
 * @namespace     sugar.js.object
 * @type          Function
 * @stable
 *
 * This function simply take an object like this one:
 * {
 *    'something.cool': 'hello'
 * }
 * and convert it to something like this:
 * {
 *    something: {
 *      cool: 'hello'
 *    }
 * }
 *
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepize from '@coffeekraken/sugar/js/object/deepize';
 * deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepize(object) {
    const finalObject = {};
    for (const key in object) {
        set_1.default(finalObject, key, object[key]);
    }
    return finalObject;
}
module.exports = deepize;
//# sourceMappingURL=module.js.map