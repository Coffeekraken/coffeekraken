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
        define(["require", "exports", "./_SType", "./descriptors/stringTypeDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _SType_1 = __importDefault(require("./_SType"));
    require("./descriptors/stringTypeDescriptor");
    return _SType_1.default;
});
