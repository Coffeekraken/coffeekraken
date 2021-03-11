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
        define(["require", "exports", "./_SCache", "./adapters/SCacheLsAdapter", "./_SCache"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _SCache_1 = __importDefault(require("./_SCache"));
    var SCacheLsAdapter_1 = __importDefault(require("./adapters/SCacheLsAdapter"));
    // @ts-ignore
    _SCache_1.default.registerAdapter(SCacheLsAdapter_1.default);
    __exportStar(require("./_SCache"), exports);
    exports.default = _SCache_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHNEQUFpQztJQUNqQywrRUFBMkQ7SUFFM0QsYUFBYTtJQUNiLGlCQUFRLENBQUMsZUFBZSxDQUFDLHlCQUFpQixDQUFDLENBQUM7SUFFNUMsNENBQTBCO0lBQzFCLGtCQUFlLGlCQUFRLENBQUMifQ==