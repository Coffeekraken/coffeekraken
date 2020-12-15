"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const to_regex_1 = __importDefault(require("to-regex"));
/**
 * @name        dedupe
 * @namespace   sugar.js.string
 * @type        Function
 * @stable
 *
 * This function simple make sure that you don't have duplicate statements in the passed string
 *
 * @param           {String}        string        The string to process
 * @param           {String}        statement       The statement to check
 * @return          {String}                      The deduplicated string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import dedupe from '@coffeekraken/sugar/js/string/dedupe';
 * dedupe('hello world hello your', 'hello'); // => hello world your
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dedupe(str, statement) {
    const reg = to_regex_1.default(`(${statement})`, {
        contains: true,
        flags: 'g'
    });
    return str
        .split(reg)
        .reverse()
        .filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
    })
        .reverse()
        .join('');
}
module.exports = dedupe;
//# sourceMappingURL=dedupe.js.map