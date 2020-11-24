"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildConfigCli_1 = __importDefault(require("../../node/build/SBuildConfigCli"));
const SBuildConfigActionsStream_1 = __importDefault(require("../../node/build/SBuildConfigActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definitionObj: SBuildConfigCli_1.default.interface.definitionObj
    });
    const stream = new SBuildConfigActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
