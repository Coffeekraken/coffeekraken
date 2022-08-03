"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            ifMatch
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This represent the `match` handlebars helper that allows you to execute a passed regex on the passed string
 *
 * @param       {String}        str             The string on which to apply our regex
 * @param       {String}        regex           The regex you want to apply
 * @return      {Boolean}                       true if match, false if not
 *
 * @example         html
 * {{#each object}}
 * {{ifMatch 'my-cool-string' '.*-cool-.*' }}
 *  <h1>Hello world</h1>
 * {{/ifMatch}}
 * {{/each}}
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ifMatch(str, regex, options) {
    if (str.match(new RegExp(regex)) !== null) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
exports.default = ifMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUtkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU87SUFDL0MsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZDLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQztBQU5ELDBCQU1DIn0=