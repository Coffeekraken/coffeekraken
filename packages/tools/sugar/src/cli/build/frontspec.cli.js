"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildFrontspecProcess_1 = __importDefault(require("../../node/frontspec/build/SBuildFrontspecProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
exports.default = async (stringArgs = '') => {
    new SProcessManager_1.default(SBuildFrontspecProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs
    });
};
