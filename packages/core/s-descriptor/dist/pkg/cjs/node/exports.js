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
const SDescriptor_1 = __importDefault(require("../shared/SDescriptor"));
const SDescriptorResult_1 = __importDefault(require("../shared/SDescriptorResult"));
exports.SDescriptorResult = SDescriptorResult_1.default;
const pathRule_1 = __importDefault(require("./rules/pathRule"));
SDescriptor_1.default.registerRule(pathRule_1.default);
__exportStar(require("../shared/SDescriptorResult"), exports);
__exportStar(require("../shared/SDescriptor"), exports);
exports.default = SDescriptor_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWdEO0FBQ2hELG9GQUE0RDtBQVFuRCw0QkFSRiwyQkFBaUIsQ0FRRTtBQU4xQixnRUFBd0M7QUFDeEMscUJBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0FBRW5DLDhEQUE0QztBQUM1Qyx3REFBc0M7QUFHdEMsa0JBQWUscUJBQVcsQ0FBQyJ9