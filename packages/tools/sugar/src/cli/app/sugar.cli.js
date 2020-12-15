"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarAppTerminalUi_1 = __importDefault(require("../../node/app/sugar/SSugarAppTerminalUi"));
const SSugarAppProcess_1 = __importDefault(require("../../node/app/sugar/SSugarAppProcess"));
function sugar(stringArgs = '') {
    const sugarAppProcess = new SSugarAppProcess_1.default({
        runAsChild: false,
        stdio: SSugarAppTerminalUi_1.default
    });
    sugarAppProcess.run(stringArgs);
}
module.exports = sugar;
//# sourceMappingURL=sugar.cli.js.map