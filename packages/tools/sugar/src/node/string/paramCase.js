"use strict";
// @ts-nocheck
// @shared
const param_case_1 = require("param-case");
/**
 * @name          paramCase
 * @namespace           sugar.js.string
 * @type          Function
 * @stable
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function paramCaseFn(string) {
    return param_case_1.paramCase(string);
}
module.exports = paramCaseFn;
//# sourceMappingURL=paramCase.js.map