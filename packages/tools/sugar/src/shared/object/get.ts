// @ts-nocheck

import __unquote from '../string/unquote';
import __unique from '@coffeekraken/sugar/shared/array/unique';

/**
 * @name                          get
 * @namespace            js.object
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
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function get(obj, path, settings = {}) {
    settings = {
        ...settings,
    };
    if (obj[path] !== undefined) return obj[path];
    if (!path || path === '' || path === '.') return obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
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
    if (obj[path] !== undefined) return obj[path];
    if (!path || path === '' || path === '.') return obj;
    const a = path
        .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
        .map((p) => __unquote(p));
    let o = obj;

    while (a.length) {
        const n = a.shift().replace(/\?$/, '');
        if (typeof o !== 'object' || !(n in o)) {
            return;
        }
        o = o[n];
    }

    return o;
}

export default get;
