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
exports.SProcessInterface = exports.SProcessManager = void 0;
const SProcess_1 = __importDefault(require("./SProcess"));
const SProcessManager_1 = __importDefault(require("./SProcessManager"));
exports.SProcessManager = SProcessManager_1.default;
// import SProcessPipe from './SProcessPipe';
const SProcessInterface_1 = __importDefault(require("./interface/SProcessInterface"));
exports.SProcessInterface = SProcessInterface_1.default;
__exportStar(require("./SProcessManager"), exports);
// export * from './SProcessPipe';
__exportStar(require("./SProcess"), exports);
exports.default = SProcess_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUNsQyx3RUFBZ0Q7QUFRdkMsMEJBUkYseUJBQWUsQ0FRRTtBQVB4Qiw2Q0FBNkM7QUFDN0Msc0ZBQThEO0FBTXBDLDRCQU5uQiwyQkFBaUIsQ0FNbUI7QUFKM0Msb0RBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyw2Q0FBMkI7QUFHM0Isa0JBQWUsa0JBQVEsQ0FBQyJ9