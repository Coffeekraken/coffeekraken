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
exports.SDescriptorResult = void 0;
const SDescriptor_1 = __importDefault(require("../shared/SDescriptor"));
const SDescriptorResult_1 = __importDefault(require("../shared/SDescriptorResult"));
exports.SDescriptorResult = SDescriptorResult_1.default;
const pathRule_1 = __importDefault(require("./rules/pathRule"));
SDescriptor_1.default.registerRule(pathRule_1.default);
__exportStar(require("../shared/ISDescriptor"), exports);
__exportStar(require("../shared/SDescriptorResult"), exports);
__exportStar(require("../shared/SDescriptor"), exports);
exports.default = SDescriptor_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFnRDtBQUNoRCxvRkFBNEQ7QUFTbkQsNEJBVEYsMkJBQWlCLENBU0U7QUFQMUIsZ0VBQXdDO0FBQ3hDLHFCQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztBQUVuQyx5REFBdUM7QUFDdkMsOERBQTRDO0FBQzVDLHdEQUFzQztBQUd0QyxrQkFBZSxxQkFBVyxDQUFDIn0=