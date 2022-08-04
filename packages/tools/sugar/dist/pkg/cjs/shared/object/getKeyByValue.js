"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          getKeyByValue
 * @namespace            shared.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return the key that correspond to the passed value in the passed object
 *
 * @param         {Object}        object        The object in which to search for the value
 * @param         {Mixed}         value         The value to find in the object
 * @return        {String}                      The key of the wanted value or false if not found
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import getKeyByValue from '@coffeekraken/sugar/js/object/getKeyByValue';
 * console.log(getKeyByValue({ hello: 'world' }, 'world')); // => hello
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
exports.default = getKeyByValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSztJQUNoQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9