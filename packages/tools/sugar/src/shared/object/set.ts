// @ts-nocheck

import __unquote from '../string/unquote';
import __get from './get';

/**
 * @name                                        set
 * @namespace            shared.object
 * @type                                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import { __set } from '@coffeekraken/sugar/object';
 *  __set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __set(obj, path, value, settings = {}) {
    settings = {
        ...settings,
    };

    let o = obj,
        a;

    if (typeof path === 'string') {
        if (!path || path === '' || path === '.') {
            obj = value;
            return;
        }

        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        a = __unquote(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map((p) => __unquote(p));
    } else if (Array.isArray(path)) {
        a = [...path];
    }

    while (a.length - 1) {
        const n = a.shift();
        if (!(n in o)) {
            if (typeof a[0] === 'string') {
                if (a[0].match(/^\[[0-9]+\]$/)) o[n] = [];
                else o[n] = {};
            } else {
                o[n] = {};
            }
        }
        if (!o[n]) {
            o[n] = {};
        }

        o = o[n];
    }

    if (typeof a[0] === 'string' && a[0].match(/^\[[0-9]+\]$/)) {
        if (!Array.isArray(o)) o = [];
        o.push(value);
    } else {
        o[a[0]] = value;
    }
    return __get(obj, path);
}
