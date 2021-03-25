"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SJsCompilerInterface = exports.SJsCompilerProcess = void 0;
const SJsCompiler_1 = __importDefault(require("./SJsCompiler"));
const SJsCompilerProcess_1 = __importDefault(require("./SJsCompilerProcess"));
exports.SJsCompilerProcess = SJsCompilerProcess_1.default;
const SJsCompilerInterface_1 = __importDefault(require("./interface/SJsCompilerInterface"));
exports.SJsCompilerInterface = SJsCompilerInterface_1.default;
// export * from './interface/SJsCompilerInterface';
// export * from './SJsCompilerProcess';
__exportStar(require("./SJsCompiler"), exports);
exports.default = SJsCompiler_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUF3QztBQUN4Qyw4RUFBc0Q7QUFPN0MsNkJBUEYsNEJBQWtCLENBT0U7QUFOM0IsNEZBQW9FO0FBTXZDLCtCQU50Qiw4QkFBb0IsQ0FNc0I7QUFKakQsb0RBQW9EO0FBQ3BELHdDQUF3QztBQUN4QyxnREFBOEI7QUFHOUIsa0JBQWUscUJBQVcsQ0FBQyJ9