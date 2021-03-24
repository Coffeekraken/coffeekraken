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
        define(["require", "exports", "./_SDescriptor", "./rules/requiredRule", "./rules/typeRule", "./rules/minRule", "./rules/maxRule", "./rules/pathRule", "./_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _SDescriptor_1 = __importDefault(require("./_SDescriptor"));
    const requiredRule_1 = __importDefault(require("./rules/requiredRule"));
    const typeRule_1 = __importDefault(require("./rules/typeRule"));
    const minRule_1 = __importDefault(require("./rules/minRule"));
    const maxRule_1 = __importDefault(require("./rules/maxRule"));
    const pathRule_1 = __importDefault(require("./rules/pathRule"));
    _SDescriptor_1.default.registerRule(requiredRule_1.default);
    _SDescriptor_1.default.registerRule(typeRule_1.default);
    _SDescriptor_1.default.registerRule(minRule_1.default);
    _SDescriptor_1.default.registerRule(maxRule_1.default);
    _SDescriptor_1.default.registerRule(pathRule_1.default);
    __exportStar(require("./_SDescriptor"), exports);
    exports.default = _SDescriptor_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxrRUFBeUM7SUFDekMsd0VBQWdEO0lBQ2hELGdFQUF3QztJQUN4Qyw4REFBc0M7SUFDdEMsOERBQXNDO0lBQ3RDLGdFQUF3QztJQUV4QyxzQkFBVyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUM7SUFDdkMsc0JBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBQ25DLHNCQUFXLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztJQUNsQyxzQkFBVyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7SUFDbEMsc0JBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBRW5DLGlEQUErQjtJQUMvQixrQkFBZSxzQkFBVyxDQUFDIn0=