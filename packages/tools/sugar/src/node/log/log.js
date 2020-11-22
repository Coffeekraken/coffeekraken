"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SLog_1 = require("./SLog");
/**
 * @name              log
 * @namespace           sugar.js.log
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the log features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import log from '@coffeekraken/sugar/js/log/log';
 * log('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function log(message) {
    if (!(global || window)._sLogDefaultInstance) {
        (global || window)._sLogDefaultInstance = new SLog_1.default({});
    }
    return (global || window)._sLogDefaultInstance.log(message);
}
exports.default = log;
