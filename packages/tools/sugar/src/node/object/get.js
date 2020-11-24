// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return function (obj, path) {
        if (obj[path] !== undefined)
            return obj[path];
        if (!path || path === '' || path === '.')
            return obj;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split('.');
        var o = obj;
        while (a.length) {
            var n = a.shift();
            if (typeof o !== 'object')
                return;
            if (!(n in o))
                return;
            o = o[n];
        }
        return o;
    };
});
