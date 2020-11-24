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
        define(["require", "exports", "../blessed/SBlessedOutput"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SBlessedOutput_1 = __importDefault(require("../blessed/SBlessedOutput"));
    return function (source, settings) {
        if (settings === void 0) { settings = {}; }
        var output = new SBlessedOutput_1.default(source, settings);
        return output;
    };
});
