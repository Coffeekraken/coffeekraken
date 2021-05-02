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
const SInterface_1 = __importDefault(require("../shared/SInterface"));
const SInterfaceTerminalRenderer_1 = __importDefault(require("./renderers/SInterfaceTerminalRenderer"));
// register renderers
SInterface_1.default.registerRenderer(SInterfaceTerminalRenderer_1.default);
__exportStar(require("../shared/SInterface"), exports);
exports.default = SInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQThDO0FBQzlDLHdHQUFnRjtBQUVoRixxQkFBcUI7QUFDckIsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxvQ0FBMEIsQ0FBQyxDQUFDO0FBRXhELHVEQUFxQztBQUNyQyxrQkFBZSxvQkFBVSxDQUFDIn0=