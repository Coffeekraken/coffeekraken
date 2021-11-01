// @ts-nocheck
/**
 * @name            ifEqual
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ifEqual(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZFcXVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlmRXF1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU87SUFDbkQsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQ25CLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQyJ9