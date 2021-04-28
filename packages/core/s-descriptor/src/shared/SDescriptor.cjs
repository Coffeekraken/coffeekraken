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
const _SDescriptor_1 = __importDefault(require("./_SDescriptor"));
const requiredRule_1 = __importDefault(require("./rules/requiredRule"));
const typeRule_1 = __importDefault(require("./rules/typeRule"));
const minRule_1 = __importDefault(require("./rules/minRule"));
const maxRule_1 = __importDefault(require("./rules/maxRule"));
const pathRule_1 = __importDefault(require("./rules/pathRule"));
_SDescriptor_1.default.registerRule(requiredRule_1.default);
_SDescriptor_1.default.registerRule(typeRule_1.default);
_SDescriptor_1.default.registerRule(minRule_1.default);
_SDescriptor_1.default.registerRule(maxRule_1.default);
_SDescriptor_1.default.registerRule(pathRule_1.default);
__exportStar(require("./_SDescriptor"), exports);
exports.default = _SDescriptor_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZGVzY3JpcHRvci9zcmMvc2hhcmVkL1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUF5QztBQUN6Qyx3RUFBZ0Q7QUFDaEQsZ0VBQXdDO0FBQ3hDLDhEQUFzQztBQUN0Qyw4REFBc0M7QUFDdEMsZ0VBQXdDO0FBRXhDLHNCQUFXLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQztBQUN2QyxzQkFBVyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7QUFDbkMsc0JBQVcsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0FBQ2xDLHNCQUFXLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztBQUNsQyxzQkFBVyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7QUFFbkMsaURBQStCO0FBQy9CLGtCQUFlLHNCQUFXLENBQUMifQ==