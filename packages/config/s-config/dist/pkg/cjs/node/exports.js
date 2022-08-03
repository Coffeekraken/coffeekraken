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
exports.SConfigFolderAdapter = exports.SConfigAdapter = void 0;
const SConfigAdapter_1 = __importDefault(require("../shared/adapters/SConfigAdapter"));
exports.SConfigAdapter = SConfigAdapter_1.default;
const SConfigFolderAdapter_1 = __importDefault(require("./adapters/SConfigFolderAdapter"));
exports.SConfigFolderAdapter = SConfigFolderAdapter_1.default;
const SConfig_1 = __importDefault(require("../shared/SConfig"));
__exportStar(require("../shared/adapters/SConfigAdapter"), exports);
__exportStar(require("./adapters/SConfigFolderAdapter"), exports);
__exportStar(require("../shared/SConfig"), exports);
exports.default = SConfig_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUZBQStEO0FBUXRELHlCQVJGLHdCQUFjLENBUUU7QUFQdkIsMkZBQW1FO0FBTzFDLCtCQVBsQiw4QkFBb0IsQ0FPa0I7QUFON0MsZ0VBQXdDO0FBRXhDLG9FQUFrRDtBQUNsRCxrRUFBZ0Q7QUFDaEQsb0RBQWtDO0FBR2xDLGtCQUFlLGlCQUFPLENBQUMifQ==