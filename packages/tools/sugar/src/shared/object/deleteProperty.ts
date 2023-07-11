// @ts-nocheck

import __set from './set.js';

/**
 * @name                      deleteProperty
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deleteProperty($1, $2)
 *
 * @example         js
 * import { __deleteProperty } from '@coffeekraken/sugar/object';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * __deleteProperty(myObject, 'plop');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deleteProperty(object, dotPath) {
    const parentDotPath = dotPath.split('.').slice(0, -1).join('.');

    if (!dotPath || dotPath === '' || dotPath === '.') return object;
    dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
    dotPath = dotPath.replace(/^\./, '');
    const a = dotPath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const valueToDelete = o[n];
                o = o.filter((v) => {
                    return v !== valueToDelete;
                });
            } else {
                delete o[n];
            }
            __set(object, parentDotPath, o);
        } else {
            o = o[n];
        }
    }
    return object;
}
