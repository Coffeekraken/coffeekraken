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
        define(["require", "exports", "./get", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    var get_1 = __importDefault(require("./get"));
    var set_1 = __importDefault(require("./set"));
    return function (obj, path, value) {
        if (value === void 0) { value = {}; }
        var v = get_1.default(obj, path);
        if (v === undefined) {
            set_1.default(obj, path, value);
        }
    };
});
