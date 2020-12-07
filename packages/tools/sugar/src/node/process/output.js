"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedOutput_1 = __importDefault(require("../blessed/SBlessedOutput"));
module.exports = (source, settings = {}) => {
    // source.on(
    //   [
    //     'log',
    //     '*.log',
    //     'warning',
    //     '*.warning',
    //     'warn',
    //     '*.warn',
    //     'error',
    //     '*.error'
    //   ].join(','),
    //   (data, metas) => {
    //     console.log(data, metas.stack);
    //   }
    // );
    // return;
    const output = new SBlessedOutput_1.default(source, settings);
    return output;
};
//# sourceMappingURL=output.js.map