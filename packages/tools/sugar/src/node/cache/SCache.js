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
const _SCache_1 = __importDefault(require("./_SCache"));
const SCacheFsAdapter_1 = __importDefault(require("./adapters/SCacheFsAdapter"));
// @ts-ignore
_SCache_1.default.registerAdapter(SCacheFsAdapter_1.default);
__exportStar(require("./_SCache"), exports);
exports.default = _SCache_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFpQztBQUNqQyxpRkFBMkQ7QUFFM0QsYUFBYTtBQUNiLGlCQUFRLENBQUMsZUFBZSxDQUFDLHlCQUFpQixDQUFDLENBQUM7QUFFNUMsNENBQTBCO0FBQzFCLGtCQUFlLGlCQUFRLENBQUMifQ==