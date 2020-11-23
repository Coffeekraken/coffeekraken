"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error ts-migrate(2306) FIXME: File '/workspaces/coffeekraken/packages/tools/suga... Remove this comment to see the full error message
const SSugarAppTerminalUi_1 = __importDefault(require("../../node/app/sugar/SSugarAppTerminalUi"));
// @ts-expect-error ts-migrate(2306) FIXME: File '/workspaces/coffeekraken/packages/tools/suga... Remove this comment to see the full error message
const SSugarAppProcess_1 = __importDefault(require("../../node/app/sugar/SSugarAppProcess"));
function default_1(stringArgs = '') {
    const sugarAppProcess = new SSugarAppProcess_1.default({
        runAsChild: false,
        output: SSugarAppTerminalUi_1.default
    });
    sugarAppProcess.run(stringArgs);
}
exports.default = default_1;
