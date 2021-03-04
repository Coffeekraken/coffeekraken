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
const _SType_1 = __importDefault(require("./_SType"));
require("./sTypeRegisterDefaultDescriptors");
// node specific types
const fileTypeDescriptor_1 = __importDefault(require("./descriptors/fileTypeDescriptor"));
_SType_1.default.registerType(fileTypeDescriptor_1.default);
__exportStar(require("./_SType"), exports);
exports.default = _SType_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsNkNBQTJDO0FBRTNDLHNCQUFzQjtBQUN0QiwwRkFBb0U7QUFFcEUsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsQ0FBQztBQUUzQywyQ0FBeUI7QUFDekIsa0JBQWUsZ0JBQU8sQ0FBQyJ9