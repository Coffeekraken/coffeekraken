"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBuildScssProcess_1 = __importDefault(require("../../node/scss/build/SBuildScssProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
module.exports = (stringArgs = '') => {
    new SProcessManager_1.default(SBuildScssProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=module.js.map