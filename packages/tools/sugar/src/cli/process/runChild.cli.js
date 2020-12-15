"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SProcess_1 = __importDefault(require("../../node/process/SProcess"));
module.exports = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const ProcessClass = require(args.processPath);
    if (ProcessClass instanceof SProcess_1.default) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
};
//# sourceMappingURL=runChild.cli.js.map