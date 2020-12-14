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
        define(["require", "exports", "./_SDescriptor", "./rules/requiredRule", "./rules/typeRule", "./rules/minRule", "./rules/maxRule"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _SDescriptor_1 = __importDefault(require("./_SDescriptor"));
    require("./rules/requiredRule");
    require("./rules/typeRule");
    require("./rules/minRule");
    require("./rules/maxRule");
    return _SDescriptor_1.default;
});
//# sourceMappingURL=module.js.map