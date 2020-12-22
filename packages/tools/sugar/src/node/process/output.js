"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedProcessOutput_1 = __importDefault(require("./output/blessed/SBlessedProcessOutput"));
module.exports = (source, settings = {}) => {
    const output = new SBlessedProcessOutput_1.default([source], source, settings);
    return output;
};
//# sourceMappingURL=output.js.map