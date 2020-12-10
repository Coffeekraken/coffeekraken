"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
const output_1 = __importDefault(require("../../node/process/output"));
module.exports = (stringArgs = '') => {
    const process = linkPackages_1.default();
    output_1.default(process);
};
//# sourceMappingURL=module.js.map