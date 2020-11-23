"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SLog_1 = __importDefault(require("./SLog"));
/**
 * @name              info
 * @namespace           sugar.js.info
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the info features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly infoged
 *
 * @example         js
 * import info from '@coffeekraken/sugar/js/log/info';
 * info('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function info(message) {
    if (!(global || window)._sLogDefaultInstance) {
        (global || window)._sLogDefaultInstance = new SLog_1.default({});
    }
    return (global || window)._sLogDefaultInstance.info(message);
}
exports.default = info;
