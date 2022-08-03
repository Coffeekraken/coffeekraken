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
const maxRule_1 = __importDefault(require("./rules/maxRule"));
const minRule_1 = __importDefault(require("./rules/minRule"));
const requiredRule_1 = __importDefault(require("./rules/requiredRule"));
const typeRule_1 = __importDefault(require("./rules/typeRule"));
const _SDescriptor_1 = __importDefault(require("./_SDescriptor"));
_SDescriptor_1.default.registerRule(requiredRule_1.default);
_SDescriptor_1.default.registerRule(typeRule_1.default);
_SDescriptor_1.default.registerRule(minRule_1.default);
_SDescriptor_1.default.registerRule(maxRule_1.default);
__exportStar(require("./_SDescriptor"), exports);
exports.default = _SDescriptor_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBc0M7QUFDdEMsOERBQXNDO0FBQ3RDLHdFQUFnRDtBQUNoRCxnRUFBd0M7QUFDeEMsa0VBQXlDO0FBRXpDLHNCQUFXLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQztBQUN2QyxzQkFBVyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7QUFDbkMsc0JBQVcsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0FBQ2xDLHNCQUFXLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztBQUVsQyxpREFBK0I7QUFDL0Isa0JBQWUsc0JBQVcsQ0FBQyJ9