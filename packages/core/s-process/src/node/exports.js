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
exports.SProcessInterface = exports.SProcessPipe = exports.SProcessManager = void 0;
const SProcess_1 = __importDefault(require("./SProcess"));
const SProcessManager_1 = __importDefault(require("./SProcessManager"));
exports.SProcessManager = SProcessManager_1.default;
const SProcessPipe_1 = __importDefault(require("./SProcessPipe"));
exports.SProcessPipe = SProcessPipe_1.default;
const SProcessInterface_1 = __importDefault(require("./interface/SProcessInterface"));
exports.SProcessInterface = SProcessInterface_1.default;
// export * from './SProcessManager';
__exportStar(require("./SProcessPipe"), exports);
__exportStar(require("./SProcess"), exports);
exports.default = SProcess_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUNsQyx3RUFBZ0Q7QUFRdkMsMEJBUkYseUJBQWUsQ0FRRTtBQVB4QixrRUFBMEM7QUFPaEIsdUJBUG5CLHNCQUFZLENBT21CO0FBTnRDLHNGQUE4RDtBQU10Qiw0QkFOakMsMkJBQWlCLENBTWlDO0FBSnpELHFDQUFxQztBQUNyQyxpREFBK0I7QUFDL0IsNkNBQTJCO0FBRzNCLGtCQUFlLGtCQUFRLENBQUMifQ==