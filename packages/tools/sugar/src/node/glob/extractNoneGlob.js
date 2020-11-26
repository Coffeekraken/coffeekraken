"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const glob_parent_1 = __importDefault(require("glob-parent"));
/**
 * @name                extractNoneGlob
 * @namespace           sugar.js.glob
 * @type                Function
 * @stable
 *
 * This function simply return you the none glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the none glob part
 * @return      {String}                            The none glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extractNoneGlob from '@coffeekraken/sugar/js/glob/extractNoneGlob';
 * extractNoneGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractNoneGlob(string) {
    const parent = glob_parent_1.default(string);
    return parent;
}
module.exports = extractNoneGlob;
