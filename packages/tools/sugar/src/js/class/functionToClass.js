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
        define(["require", "exports", "func-to-classes"], factory);
    }
})(function (require, exports) {
    "use strict";
    var func_to_classes_1 = __importDefault(require("func-to-classes"));
    return func_to_classes_1.default;
});
