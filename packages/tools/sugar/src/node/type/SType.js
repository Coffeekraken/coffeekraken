"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const _SType_1 = __importDefault(require("./_SType"));
require("./sTypeRegisterDefaultDescriptors");
// node specific types
const fileTypeDescriptor_1 = __importDefault(require("./descriptors/fileTypeDescriptor"));
_SType_1.default.registerType(fileTypeDescriptor_1.default);
module.exports = _SType_1.default;
//# sourceMappingURL=module.js.map