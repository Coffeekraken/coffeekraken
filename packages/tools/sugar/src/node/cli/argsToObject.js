"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("./parseArgs"));
const completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
/**
 * @name                  argsToObject
 * @namespace           sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object|String}        argsObj        The arguments object or string
 * @param       {Object}            [settings]        The settings object to configure your conversion process:
 * - definitionObj (null) {Object}: Specify a definitionObj to use
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return      {Object}                              The final values object
 *
 * @example       js
 * import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
 * argsToObject('-a Yop, {
 *    definitionObj: {
 *      arg1: {
 *       type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
 * });
 * // => { arg1: 'Yop', lastArg: 'Nelson' }
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function argsToObject(argsObj, settings = {}) {
    if (typeof argsObj === 'string') {
        return parseArgs_1.default(argsObj, {
            definitionObj: settings.definitionObj
        });
    }
    return completeArgsObject_1.default(argsObj || {}, settings);
}
exports.default = argsToObject;
;
