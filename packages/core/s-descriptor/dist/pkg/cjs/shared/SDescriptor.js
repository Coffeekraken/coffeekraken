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
const _SDescriptor_js_1 = __importDefault(require("./_SDescriptor.js"));
const maxRule_js_1 = __importDefault(require("./rules/maxRule.js"));
const minRule_js_1 = __importDefault(require("./rules/minRule.js"));
const requiredRule_js_1 = __importDefault(require("./rules/requiredRule.js"));
const typeRule_js_1 = __importDefault(require("./rules/typeRule.js"));
_SDescriptor_js_1.default.registerRule(requiredRule_js_1.default);
_SDescriptor_js_1.default.registerRule(typeRule_js_1.default);
_SDescriptor_js_1.default.registerRule(minRule_js_1.default);
_SDescriptor_js_1.default.registerRule(maxRule_js_1.default);
__exportStar(require("./_SDescriptor.js"), exports);
exports.default = _SDescriptor_js_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBNEM7QUFDNUMsb0VBQXlDO0FBQ3pDLG9FQUF5QztBQUN6Qyw4RUFBbUQ7QUFDbkQsc0VBQTJDO0FBRTNDLHlCQUFXLENBQUMsWUFBWSxDQUFDLHlCQUFZLENBQUMsQ0FBQztBQUN2Qyx5QkFBVyxDQUFDLFlBQVksQ0FBQyxxQkFBUSxDQUFDLENBQUM7QUFDbkMseUJBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQU8sQ0FBQyxDQUFDO0FBQ2xDLHlCQUFXLENBQUMsWUFBWSxDQUFDLG9CQUFPLENBQUMsQ0FBQztBQUVsQyxvREFBa0M7QUFDbEMsa0JBQWUseUJBQVcsQ0FBQyJ9