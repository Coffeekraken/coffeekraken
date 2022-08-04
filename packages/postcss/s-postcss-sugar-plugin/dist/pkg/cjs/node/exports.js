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
exports.postcss = void 0;
const postcssSugarPlugin_1 = __importDefault(require("./postcssSugarPlugin"));
__exportStar(require("./postcssSugarPlugin"), exports);
exports.postcss = true;
exports.default = postcssSugarPlugin_1.default;
if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = postcssSugarPlugin_1.default;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXNEO0FBQ3RELHVEQUFxQztBQUN4QixRQUFBLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDNUIsa0JBQWUsNEJBQWtCLENBQUM7QUFFbEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsNEJBQWtCLENBQUM7Q0FDdkMifQ==