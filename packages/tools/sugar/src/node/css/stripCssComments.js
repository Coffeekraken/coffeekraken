"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../object/deepMerge");
const strip_css_comments_1 = require("strip-css-comments");
/**
 * @name          stripCssComments
 * @namespace     sugar.js.css
 * @type          Function
 *
 * This function simply remove all the css comments like:
 * - Multiline blocks css comments begining with /* *, ending with * /
 * - Single line comments begining with //
 *
 * @param       {String}        css         The css code to process
 * @param       {Object}      [settings={}]   An object of settings
 * @return      {String}                    The processed css code
 *
 * @setting     {Boolean}     [block=true]       Remove the blocks comments
 * @setting     {Boolean}     [line=true]       Remove the line comments
 *
 * @todo        tests
 *
 * @example       js
 * import stripCssComments from '@coffeekraken/sugar/js/css/stripCssComments';
 * stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stripCssComments(css, settings = {}) {
    settings = deepMerge_1.default({
        block: true,
        line: true
    }, settings);
    if (settings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = strip_css_comments_1.default(css, {
            preserve: false
        });
    }
    if (settings.line) {
        css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
    }
    return css;
}
exports.default = stripCssComments;
