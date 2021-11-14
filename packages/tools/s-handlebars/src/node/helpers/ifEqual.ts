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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ifEqual(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}
