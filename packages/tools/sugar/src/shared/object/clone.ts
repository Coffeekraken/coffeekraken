// @ts-nocheck

import __clone from 'lodash.clone';
import __deepClone from 'lodash.clonedeep';

/**
 * @name                clone
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Object}       [settings={}]   Specify some settings to configure your clone process
 * @return      {Object}                      The cloned object
 *
 * @setting     {Boolean}       [deep=false]      Specify if you want to clone the object deeply
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __clone } from '@coffeekraken/sugar/object';
 * __clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function clone(object, settings = {}) {
    settings = {
        deep: false,
        ...settings,
    };
    if (settings.deep) {
        return __deepClone(object);
    }
    return __clone(object);
}
