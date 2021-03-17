// @shared
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
        define(["require", "exports", "./_SDescriptor", "./rules/requiredRule", "./rules/typeRule", "./rules/minRule", "./rules/maxRule", "./_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _SDescriptor_1 = __importDefault(require("./_SDescriptor"));
    require("./rules/requiredRule");
    require("./rules/typeRule");
    require("./rules/minRule");
    require("./rules/maxRule");
    __exportStar(require("./_SDescriptor"), exports);
    exports.default = _SDescriptor_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvZGVzY3JpcHRvci9TRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsZ0VBQXlDO0lBQ3pDLGdDQUE4QjtJQUM5Qiw0QkFBMEI7SUFDMUIsMkJBQXlCO0lBQ3pCLDJCQUF5QjtJQUV6QixpREFBK0I7SUFDL0Isa0JBQWUsc0JBQVcsQ0FBQyJ9