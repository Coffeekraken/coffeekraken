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
exports.SBlessedStdio = exports.STerminalStdio = void 0;
const SStdio_1 = __importDefault(require("../shared/SStdio"));
const STerminalStdio_1 = __importDefault(require("./terminal/STerminalStdio"));
exports.STerminalStdio = STerminalStdio_1.default;
const SBlessedStdio_1 = __importDefault(require("./blessed/SBlessedStdio"));
exports.SBlessedStdio = SBlessedStdio_1.default;
__exportStar(require("../shared/SStdio"), exports);
__exportStar(require("./terminal/STerminalStdio"), exports);
__exportStar(require("./blessed/SBlessedStdio"), exports);
exports.default = SStdio_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUF3QztBQUN4QywrRUFBdUQ7QUFPOUMseUJBUEYsd0JBQWMsQ0FPRTtBQU52Qiw0RUFBb0Q7QUFNM0Isd0JBTmxCLHVCQUFhLENBTWtCO0FBSnRDLG1EQUFpQztBQUNqQyw0REFBMEM7QUFDMUMsMERBQXdDO0FBR3hDLGtCQUFlLGdCQUFRLENBQUMifQ==