// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "is-glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    var is_glob_1 = __importDefault(require("is-glob"));
    return function (string) {
        return is_glob_1.default(string);
    };
});
//# sourceMappingURL=module.js.map