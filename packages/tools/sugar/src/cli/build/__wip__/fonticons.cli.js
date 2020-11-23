"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildFontIconsProcess_1 = __importDefault(require("../../node/build/fontIcons/SBuildFontIconsProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
const SFsDeamon_1 = __importDefault(require("../../node/deamon/fs/SFsDeamon"));
exports.default = (stringArgs = '') => {
    const manager = new SProcessManager_1.default(SBuildFontIconsProcess_1.default, {
        autoRun: true,
        deamon: new SFsDeamon_1.default({
            processParams: (params, file) => {
                return params;
            }
        }),
        processSettings: {
            runAsChild: true
        }
    });
};
