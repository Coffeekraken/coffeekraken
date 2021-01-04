"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedProcessStdio_1 = __importDefault(require("./stdio/blessed/SBlessedProcessStdio"));
module.exports = (source, settings = {}) => {
    const stdio = new SBlessedProcessStdio_1.default(source, settings);
    return stdio;
};
//# sourceMappingURL=stdio.js.map