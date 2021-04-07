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
exports.SFrontstackStartInterface = exports.SFrontstackStartProcess = void 0;
const registerFolder_1 = __importDefault(require("@coffeekraken/sugar/shared/config/registerFolder"));
const path_1 = __importDefault(require("path"));
console.log('REG');
registerFolder_1.default(`${path_1.default.resolve(__dirname, '../config')}`, 'app');
const SFrontstack_1 = __importDefault(require("./SFrontstack"));
const SFrontstackStartProcess_1 = __importDefault(require("./start/SFrontstackStartProcess"));
exports.SFrontstackStartProcess = SFrontstackStartProcess_1.default;
const SFrontstackStartInterface_1 = __importDefault(require("./start/interface/SFrontstackStartInterface"));
exports.SFrontstackStartInterface = SFrontstackStartInterface_1.default;
__exportStar(require("./SFrontstack"), exports);
exports.default = SFrontstack_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNHQUFnRjtBQUNoRixnREFBMEI7QUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQix3QkFBZ0IsQ0FBQyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFckUsZ0VBQXdDO0FBQ3hDLDhGQUFzRTtBQUs3RCxrQ0FMRixpQ0FBdUIsQ0FLRTtBQUpoQyw0R0FBb0Y7QUFJbEQsb0NBSjNCLG1DQUF5QixDQUkyQjtBQUYzRCxnREFBOEI7QUFHOUIsa0JBQWUscUJBQVcsQ0FBQyJ9