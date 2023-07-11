// @ts-nocheck

import __unique from '../array/unique.js';
import __unquote from '../string/unquote.js';

/**
 * @name                          get
 * @namespace            shared.object
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @feature       Support optional property in the doted path like "something.cool?.hello.world"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __get($1, $2)
 *
 * @example             js
 * import { __get } from '@coffeekraken/sugar/object';
 * __get(myObject, 'my.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function get(obj, path, settings = {}) {
    settings = {
        ...settings,
    };

    if (Array.isArray(path)) {
        return __get(obj, path, settings);
    }

    if (obj[path] !== undefined) return obj[path];
    if (!path || path === '' || path === '.') return obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/\\\./g, '_dot_');
    path = path.replace(/^\./, '');

    let potentialPaths = [path.replace(/\?/gm, '')];

    const parts = path.split('.');
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (part.match(/\?$/)) {
            const before = parts.slice(0, i);
            const after = parts.slice(i + 1);
            potentialPaths.push([...before, ...after].join('.'));
            potentialPaths.push(
                [...before, ...after.filter((a) => !a.match(/\?$/))].join('.'),
            );
        }
    }

    potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, '')));

    for (let i = 0; i < potentialPaths.length; i++) {
        const path = potentialPaths[i];
        const result = __get(obj, path, settings);
        if (result !== undefined) return result;
    }
}

function __get(obj, path, settings = {}) {
    settings = {
        ...settings,
    };

    let o = obj,
        a;

    if (typeof path === 'string') {
        if (obj[path] !== undefined) return obj[path];
        if (!path || path === '' || path === '.') return obj;
        path = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
    }

    a = [...path].map((p) => {
        if (typeof p === 'string') return __unquote(p);
        return p;
    });

    while (a.length) {
        let n = a.shift();
        if (typeof n === 'string') {
            n = n.replace(/\?$/, '');
        }
        if (typeof o !== 'object' || !(o && n in o)) {
            return;
        }
        o = o[n];
    }

    return o;
}

export default get;
