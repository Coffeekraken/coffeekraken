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
        define(["require", "exports", "./SType", "./STypeResult", "./utils/parseTypeString", "./SType", "./STypeResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTypeString = exports.STypeResult = void 0;
    const SType_1 = __importDefault(require("./SType"));
    const STypeResult_1 = __importDefault(require("./STypeResult"));
    exports.STypeResult = STypeResult_1.default;
    const parseTypeString_1 = __importDefault(require("./utils/parseTypeString"));
    exports.parseTypeString = parseTypeString_1.default;
    __exportStar(require("./SType"), exports);
    __exportStar(require("./STypeResult"), exports);
    exports.default = SType_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLG9EQUE0QjtJQUM1QixnRUFBd0M7SUFNL0Isc0JBTkYscUJBQVcsQ0FNRTtJQUxwQiw4RUFBc0Q7SUFLaEMsMEJBTGYseUJBQWUsQ0FLZTtJQUhyQywwQ0FBd0I7SUFDeEIsZ0RBQThCO0lBRzlCLGtCQUFlLGVBQUssQ0FBQyJ9