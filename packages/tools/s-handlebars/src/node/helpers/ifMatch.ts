// @ts-nocheck

import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';

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
export default function ifMatch(str, regex, options) {
    if (str.match(new RegExp(regex)) !== null) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}
