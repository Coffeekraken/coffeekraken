"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_parent_1 = require("glob-parent");
/**
 * @name                extractGlob
 * @namespace           sugar.js.glob
 * @type                Function
 *
 * This function simply return you the glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the glob part
 * @return      {String}                            The glob part of the passed string
 *
 * @example         js
 * import extractGlob from '@coffeekraken/sugar/js/glob/extractGlob';
 * extractGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractGlob(string) {
    const parent = glob_parent_1.default(string);
    let final = string.replace(parent, '');
    if (final.slice(0, 1) === '/')
        final = final.slice(1);
    return final;
}
exports.default = extractGlob;
