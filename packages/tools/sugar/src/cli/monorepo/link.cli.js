"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
const stdio_1 = __importDefault(require("../../node/process/stdio"));
module.exports = (stringArgs = '') => {
    const pro = linkPackages_1.default();
    stdio_1.default(pro);
};
//# sourceMappingURL=link.cli.js.map