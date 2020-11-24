"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildDocCli_1 = __importDefault(require("../../node/build/doc/SBuildDocCli"));
const SBuildDocActionsStream_1 = __importDefault(require("../../node/build/doc/SBuildDocActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definitionObj: SBuildDocCli_1.default.interface.definitionObj
    });
    const stream = new SBuildDocActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
