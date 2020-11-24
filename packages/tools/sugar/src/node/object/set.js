// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./get"], factory);
    }
})(function (require, exports) {
    "use strict";
    var get_1 = __importDefault(require("./get"));
    return function (obj, path, value) {
        if (!path || path === '' || path === '.') {
            obj = value;
            return;
        }
        var a = path.split('.');
        var o = obj;
        while (a.length - 1) {
            var n = a.shift();
            if (!(n in o))
                o[n] = {};
            o = o[n];
        }
        o[a[0]] = value;
        return get_1.default(obj, path);
    };
});
