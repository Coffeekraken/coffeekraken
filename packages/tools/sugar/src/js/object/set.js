// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./get", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    var get_1 = __importDefault(require("./get"));
    var unquote_1 = __importDefault(require("../string/unquote"));
    return function (obj, path, value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({}, settings);
        if (!path || path === '' || path === '.') {
            obj = value;
            return;
        }
        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        var a = unquote_1.default(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map(function (p) { return unquote_1.default(p); });
        var o = obj;
        while (a.length - 1) {
            var n = a.shift();
            if (!(n in o)) {
                if (a[0].match(/^\[[0-9]+\]$/))
                    o[n] = [];
                else
                    o[n] = {};
            }
            o = o[n];
        }
        if (a[0].match(/^\[[0-9]+\]$/)) {
            if (!Array.isArray(o))
                o = [];
            o.push(value);
        }
        else {
            o[a[0]] = value;
        }
        return get_1.default(obj, path);
    };
});
//# sourceMappingURL=set.js.map