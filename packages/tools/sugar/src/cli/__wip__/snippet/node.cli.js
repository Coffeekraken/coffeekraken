"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateFile_1 = __importDefault(require("./generateFile"));
exports.default = (stringArgs = '') => {
    generateFile_1.default('node ' + stringArgs);
};
//# sourceMappingURL=module.js.map