"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildNodeCli_1 = __importDefault(require("../../node/build/node/SBuildNodeCli"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const cli = new SBuildNodeCli_1.default();
    output_1.default(cli.run(stringArgs));
};
