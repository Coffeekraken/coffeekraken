"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        includes
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Same as the native String.includes function but accept either an array of items
 * or a simple comma separated string like "something,cool,hello,world"
 *
 * @param    {String}    string    The string to check
 * @param     {Array|String}    values      An array or comma separated string to check
 * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import includes from '@coffeekraken/sugar/js/string/includes'
 * includes('Hello world', 'world,coco') // ['world']
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function includes(string, values) {
    if (!Array.isArray(values))
        values = values.split(',').map((t) => t.trim());
    const valuesThatExists = [];
    values.forEach((v) => {
        if (string.includes(v)) {
            valuesThatExists.push(v);
        }
    });
    if (valuesThatExists.length)
        return valuesThatExists;
    return false;
}
exports.default = includes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RSxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDakIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNO1FBQUUsT0FBTyxnQkFBZ0IsQ0FBQztJQUNyRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=