"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            ifEqual
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This represent the `match` handlebars helper that allows you to execute a passed regex on the passed string
 *
 * @param       {Any}           value1          The value 1 to compare
 * @param       {Any}           value2          The value 2 to compare
 * @return      {Boolean}                       true if match, false if not
 *
 * @example         html
 * {{#each object}}
 * {{ifEqual 'my-cool-string' 'something' }}
 *  <h1>Hello world</h1>
 * {{/ifEqual}}
 * {{/each}}
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ifEqual(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
exports.default = ifEqual;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU87SUFDbkQsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQ25CLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQztBQU5ELDBCQU1DIn0=