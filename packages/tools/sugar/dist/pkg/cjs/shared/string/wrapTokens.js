"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        replaceTokens
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Replace the passed "tokens" with the result of the passed replacer function.
 * The replacer function take as argument the token value
 *
 * @param    {String}    string    The string to process
 * @param     {String[]}        tokens      The tokens to replace
 * @param       {Function}          replacer        The replacer function that need to return a string with which you want to replace the token
 * @return      {String}                        The new string with replaced tokens
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __replaceTokens($1, [$2], $3)
 * _replaceTokens($1, [$2], (token) => {
 *      return $3;
 * });
 *
 * @example    js
 * import { __replaceTokens } from '@coffeekraken/sugar/string'
 * __replaceTokens('hello world', ['or'], (token) => {
 *      return `<span>${token}</span>;
 * }) // Hello w<span>or</span>ld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __replaceTokens(string, tokens, replacer) {
    const reg = new RegExp(tokens.join('|'), 'gi');
    return string.replace(reg, (str) => {
        return replacer(str);
    });
}
exports.default = __replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUF3QixlQUFlLENBQ25DLE1BQWMsRUFDZCxNQUFnQixFQUNoQixRQUFrQjtJQUVsQixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9DLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMvQixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCxrQ0FTQyJ9