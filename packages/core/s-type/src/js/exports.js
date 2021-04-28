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
    const SType_1 = __importDefault(require("../shared/SType"));
    const STypeResult_1 = __importDefault(require("../shared/STypeResult"));
    exports.STypeResult = STypeResult_1.default;
    const parseTypeString_1 = __importDefault(require("../shared/utils/parseTypeString"));
    exports.parseTypeString = parseTypeString_1.default;
    __exportStar(require("../shared/SType"), exports);
    __exportStar(require("../shared/STypeResult"), exports);
    exports.default = SType_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy10eXBlL3NyYy9qcy9leHBvcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSw0REFBb0M7SUFDcEMsd0VBQWdEO0lBTXZDLHNCQU5GLHFCQUFXLENBTUU7SUFMcEIsc0ZBQThEO0lBS3hDLDBCQUxmLHlCQUFlLENBS2U7SUFIckMsa0RBQWdDO0lBQ2hDLHdEQUFzQztJQUd0QyxrQkFBZSxlQUFLLENBQUMifQ==