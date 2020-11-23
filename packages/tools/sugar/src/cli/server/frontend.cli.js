"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFrontendServerProcess_1 = __importDefault(require("../../node/server/frontend/SFrontendServerProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
exports.default = (stringArgs = '') => {
    const manager = new SProcessManager_1.default(SFrontendServerProcess_1.default, {
        autoRun: true,
        processSettings: {
            runAsChild: true
        }
    });
};
