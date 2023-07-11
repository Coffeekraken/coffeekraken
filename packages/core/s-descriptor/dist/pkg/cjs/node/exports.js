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
exports.SDescriptorResult = void 0;
const SDescriptor_js_1 = __importDefault(require("../shared/SDescriptor.js"));
const SDescriptorResult_js_1 = __importDefault(require("../shared/SDescriptorResult.js"));
exports.SDescriptorResult = SDescriptorResult_js_1.default;
const pathRule_js_1 = __importDefault(require("./rules/pathRule.js"));
SDescriptor_js_1.default.registerRule(pathRule_js_1.default);
__exportStar(require("../shared/SDescriptor.js"), exports);
__exportStar(require("../shared/SDescriptorResult.js"), exports);
exports.default = SDescriptor_js_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQW1EO0FBQ25ELDBGQUErRDtBQVF0RCw0QkFSRiw4QkFBaUIsQ0FRRTtBQU4xQixzRUFBMkM7QUFDM0Msd0JBQVcsQ0FBQyxZQUFZLENBQUMscUJBQVEsQ0FBQyxDQUFDO0FBRW5DLDJEQUF5QztBQUN6QyxpRUFBK0M7QUFHL0Msa0JBQWUsd0JBQVcsQ0FBQyJ9