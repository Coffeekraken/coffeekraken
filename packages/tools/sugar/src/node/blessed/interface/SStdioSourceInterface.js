"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
module.exports = (_a = class SOutputSourceInterface extends SInterface_1.default {
    },
    _a.definition = {
        on: {
            type: 'Function',
            required: true
        }
    },
    _a);
//# sourceMappingURL=SStdioSourceInterface.js.map