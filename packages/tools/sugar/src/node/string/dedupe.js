"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_regex_1 = require("to-regex");
/**
 * @name        dedupe
 * @namespace   sugar.js.string
 * @type        Function
 *
 * This function simple make sure that you don't have duplicate statements in the passed string
 *
 * @todo            tests
 *
 * @param           {String}        string        The string to process
 * @param           {String}        statement       The statement to check
 * @return          {String}                      The deduplicated string
 *
 * @example       js
 * const dedupe = require('@coffeekraken/sugar/js/string/dedupe');
 * dedupe('hello world hello your', 'hello'); // => hello world your
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dedupe(str, statement) {
    let reg = to_regex_1.default(`(${statement})`, {
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
exports.default = dedupe;
