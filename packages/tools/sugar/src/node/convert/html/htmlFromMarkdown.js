"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../../object/deepMerge");
const marked_1 = require("marked");
/**
 * @name            htmlFromMarkdown
 * @namespace       sugar.js.convert
 * @type            Function
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
 * htmlFromMarkdown(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @see       https://marked.js.org/#/README.md
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromMarkdown(inputString, settings = {}) {
    settings = deepMerge_1.default({}, settings);
    marked_1.default.setOptions(settings);
    return marked_1.default(inputString);
}
exports.default = htmlFromMarkdown;
