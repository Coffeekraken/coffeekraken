"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../../object/deepMerge");
const SDocblock_1 = require("../../docblock/SDocblock");
/**
 * @name            htmlFromDocblocks
 * @namespace       sugar.js.convert
 * @type            Function
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
 * htmlFromDocblocks(`
 *  \/\*\*
 *   * @name    Hello world
 *  \*\/
 * `);
 * // <h1>Hello world</h1>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromDocblocks(inputString, settings = {}) {
    settings = deepMerge_1.default({}, settings);
    const sDocblock = new SDocblock_1.default(inputString, settings);
    return sDocblock.toHtml(settings);
}
exports.default = htmlFromDocblocks;
