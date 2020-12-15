"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("./config/sugar"));
const SLog_1 = __importDefault(require("./log/SLog"));
const handleError_1 = __importDefault(require("./error/handleError"));
const initEnv_1 = __importDefault(require("./init/initEnv"));
const onProcessExit_1 = __importDefault(require("./process/onProcessExit"));
const exitCleanup_1 = __importDefault(require("./process/exitCleanup"));
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// init env
initEnv_1.default();
// handle the errors
handleError_1.default();
// exit cleanup
onProcessExit_1.default(() => {
    return exitCleanup_1.default;
});
// Logging
new SLog_1.default(sugar_1.default('log'));
//# sourceMappingURL=index.js.map