"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildViewsCli_1 = __importDefault(require("../../node/build/views/SBuildViewsCli"));
const SBuildViewsActionsStream_1 = __importDefault(require("../../node/build/views/SBuildViewsActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definition: SBuildViewsCli_1.default.interface.definition
    });
    const stream = new SBuildViewsActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
//# sourceMappingURL=views.cli.js.map