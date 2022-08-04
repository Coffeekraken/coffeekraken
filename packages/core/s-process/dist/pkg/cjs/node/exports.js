"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.SCommandProcess = exports.SProcessManager = void 0;
const SProcess_1 = __importDefault(require("./SProcess"));
const SProcessManager_1 = __importDefault(require("./SProcessManager"));
exports.SProcessManager = SProcessManager_1.default;
const SCommandProcess_1 = __importDefault(require("./SCommandProcess"));
exports.SCommandProcess = SCommandProcess_1.default;
__exportStar(require("./SProcessManager"), exports);
__exportStar(require("./SCommandProcess"), exports);
__exportStar(require("./SProcess"), exports);
__exportStar(require("./ISProcess"), exports);
exports.default = SProcess_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBQ2xDLHdFQUFnRDtBQVF2QywwQkFSRix5QkFBZSxDQVFFO0FBUHhCLHdFQUFnRDtBQU90QiwwQkFQbkIseUJBQWUsQ0FPbUI7QUFMekMsb0RBQWtDO0FBQ2xDLG9EQUFrQztBQUNsQyw2Q0FBMkI7QUFDM0IsOENBQTRCO0FBRzVCLGtCQUFlLGtCQUFRLENBQUMifQ==