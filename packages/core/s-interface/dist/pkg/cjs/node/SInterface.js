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
const SInterface_1 = __importDefault(require("../shared/SInterface"));
const SInterfaceTerminalRenderer_1 = __importDefault(require("./renderers/SInterfaceTerminalRenderer"));
// register renderers
SInterface_1.default.registerRenderer(SInterfaceTerminalRenderer_1.default);
__exportStar(require("../shared/SInterface"), exports);
exports.default = SInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsd0dBQWdGO0FBRWhGLHFCQUFxQjtBQUNyQixvQkFBVSxDQUFDLGdCQUFnQixDQUFDLG9DQUEwQixDQUFDLENBQUM7QUFFeEQsdURBQXFDO0FBQ3JDLGtCQUFlLG9CQUFVLENBQUMifQ==