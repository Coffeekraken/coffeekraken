// @ts-nocheck
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
export default function ifEqual(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZFcXVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlmRXF1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTztJQUNuRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDbkIsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFDTCxDQUFDIn0=