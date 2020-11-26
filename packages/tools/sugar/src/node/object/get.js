"use strict";
// @ts-nocheck
// @shared
module.exports = (obj, path) => {
    if (obj[path] !== undefined)
        return obj[path];
    if (!path || path === '' || path === '.')
        return obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    const a = path.split('.');
    let o = obj;
    while (a.length) {
        const n = a.shift();
        if (typeof o !== 'object')
            return;
        if (!(n in o))
            return;
        o = o[n];
    }
    return o;
};
