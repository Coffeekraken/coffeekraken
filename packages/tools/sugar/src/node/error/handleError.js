"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const childProcess_1 = __importDefault(require("../is/childProcess"));
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name                    handleError
 * @namespace               sugar.node.error
 * @type                    Function
 * @wip
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import handleError from '@coffeekraken/sugar/node/error/handleError';
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function handleError() {
    if (process.env.NODE_ENV === 'test')
        return;
    if (childProcess_1.default()) {
        process.on('uncaughtException', __handleChildProcessErrors);
        process.on('unhandledRejection', __handleChildProcessErrors);
    }
    else {
        process.on('uncaughtException', __handleMainProcessErrors);
        process.on('unhandledRejection', __handleMainProcessErrors);
    }
}
function __handleChildProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (!error)
        return;
    const errorStringArray = [error.stack];
    console.log(errorStringArray.join('\n'));
}
function __handleMainProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = error.toString();
    }
    setTimeout(() => {
        if (typeof error === 'string') {
            const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
            const stringErrorMatches = error.match(stringErrorReg);
            console.log(error);
            return;
        }
        else if (typeof error === 'object' && error.name && error.message) {
            console.log([error.name, error.message, error.stack].join('\n\n'));
            return;
        }
        else {
            console.log(toString_1.default(error));
            return;
        }
    }, 50);
}
module.exports = handleError;
//# sourceMappingURL=handleError.js.map