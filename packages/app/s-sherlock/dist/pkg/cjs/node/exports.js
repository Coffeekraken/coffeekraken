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
exports.__SSherlockAdapter = void 0;
__exportStar(require("../shared/exports.js"), exports);
const SSherlock_js_1 = __importDefault(require("./SSherlock.js"));
const SherlockAdapter_js_1 = __importDefault(require("./adapters/SherlockAdapter.js"));
exports.__SSherlockAdapter = SherlockAdapter_js_1.default;
__exportStar(require("./SSherlock.js"), exports);
__exportStar(require("./specs.js"), exports);
exports.default = SSherlock_js_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXFDO0FBQ3JDLGtFQUF5QztBQUN6Qyx1RkFBK0Q7QUFJdEQsNkJBSkYsNEJBQWtCLENBSUU7QUFGM0IsaURBQStCO0FBQy9CLDZDQUEyQjtBQUUzQixrQkFBZSxzQkFBVyxDQUFDIn0=