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
exports.__isUcBrowser = exports.__isTablet = exports.__isSamsungBrowser = exports.__isSafari = exports.__isPhone = exports.__isOpera = exports.__isMobile = exports.__isIe = exports.__isFirefox = exports.__isEdge = exports.__isChrome = void 0;
const isChrome_1 = __importDefault(require("./isChrome"));
exports.__isChrome = isChrome_1.default;
const isEdge_1 = __importDefault(require("./isEdge"));
exports.__isEdge = isEdge_1.default;
const isFirefox_1 = __importDefault(require("./isFirefox"));
exports.__isFirefox = isFirefox_1.default;
const isIe_1 = __importDefault(require("./isIe"));
exports.__isIe = isIe_1.default;
const isMobile_1 = __importDefault(require("./isMobile"));
exports.__isMobile = isMobile_1.default;
const isOpera_1 = __importDefault(require("./isOpera"));
exports.__isOpera = isOpera_1.default;
const isPhone_1 = __importDefault(require("./isPhone"));
exports.__isPhone = isPhone_1.default;
const isSafari_1 = __importDefault(require("./isSafari"));
exports.__isSafari = isSafari_1.default;
const isSamsungBrowser_1 = __importDefault(require("./isSamsungBrowser"));
exports.__isSamsungBrowser = isSamsungBrowser_1.default;
const isTablet_1 = __importDefault(require("./isTablet"));
exports.__isTablet = isTablet_1.default;
const isUcBrowser_1 = __importDefault(require("./isUcBrowser"));
exports.__isUcBrowser = isUcBrowser_1.default;
__exportStar(require("../../shared/is/_exports"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQW9DO0FBY2hDLHFCQWRHLGtCQUFVLENBY0g7QUFiZCxzREFBZ0M7QUFjNUIsbUJBZEcsZ0JBQVEsQ0FjSDtBQWJaLDREQUFzQztBQWNsQyxzQkFkRyxtQkFBVyxDQWNIO0FBYmYsa0RBQTRCO0FBY3hCLGlCQWRHLGNBQU0sQ0FjSDtBQWJWLDBEQUFvQztBQWNoQyxxQkFkRyxrQkFBVSxDQWNIO0FBYmQsd0RBQWtDO0FBYzlCLG9CQWRHLGlCQUFTLENBY0g7QUFiYix3REFBa0M7QUFjOUIsb0JBZEcsaUJBQVMsQ0FjSDtBQWJiLDBEQUFvQztBQWNoQyxxQkFkRyxrQkFBVSxDQWNIO0FBYmQsMEVBQW9EO0FBY2hELDZCQWRHLDBCQUFrQixDQWNIO0FBYnRCLDBEQUFvQztBQWNoQyxxQkFkRyxrQkFBVSxDQWNIO0FBYmQsZ0VBQTBDO0FBY3RDLHdCQWRHLHFCQUFhLENBY0g7QUFaakIsMkRBQXlDIn0=