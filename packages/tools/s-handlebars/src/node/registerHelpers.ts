import __fs from 'fs';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __require from '@coffeekraken/sugar/node/esm/require';
import * as __helpers from './helpers/index';

/**
 * @name            registerHelpers
 * @namespace       node
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to register all the helpers provided in this package
 * directly on your handlebars instance.
 *
 * @param       {Object}        handlebars      The handlebars instance on which to register the helpers
 *
 * @example         js
 * import { registerHelpers } from '@coffeekraken/s-handlebars';
 * import __handlebars from 'handlebars';
 * registerHelpers(__handlebard);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function registerHelpers(handlebars: any): void {
    for (const [key, value] of Object.entries(__helpers)) {
        handlebars.registerHelper(key, value);
        console.log;
    }
}
