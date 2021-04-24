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
        define(["require", "exports", "../shared/SType", "../shared/STypeResult", "../shared/utils/parseTypeString", "../shared/SType", "../shared/STypeResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTypeString = exports.STypeResult = void 0;
    var SType_1 = __importDefault(require("../shared/SType"));
    var STypeResult_1 = __importDefault(require("../shared/STypeResult"));
    exports.STypeResult = STypeResult_1.default;
    var parseTypeString_1 = __importDefault(require("../shared/utils/parseTypeString"));
    exports.parseTypeString = parseTypeString_1.default;
    __exportStar(require("../shared/SType"), exports);
    __exportStar(require("../shared/STypeResult"), exports);
    exports.default = SType_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDBEQUFvQztJQUNwQyxzRUFBZ0Q7SUFNdkMsc0JBTkYscUJBQVcsQ0FNRTtJQUxwQixvRkFBOEQ7SUFLeEMsMEJBTGYseUJBQWUsQ0FLZTtJQUhyQyxrREFBZ0M7SUFDaEMsd0RBQXNDO0lBR3RDLGtCQUFlLGVBQUssQ0FBQyJ9