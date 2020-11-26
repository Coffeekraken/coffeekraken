// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./parseArgs", "./completeArgsObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parseArgs_1 = __importDefault(require("./parseArgs"));
    var completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
    /**
     * @name                  argsToObject
     * @namespace           sugar.js.cli
     * @type                  Function
     * @beta
     *
     * This function take a simple object, a definition object and return you the string version that you can pass
     * directly to the command line interface
     *
     * @param       {Object|String}        argsObj        The arguments object or string
     * @param       {Object}            [settings]        The settings object to configure your conversion process:
     * - definition (null) {Object}: Specify a definition to use
     * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
     * @return      {Object}                              The final values object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
     * argsToObject('-a Yop, {
     *    definition: {
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
    function argsToObject(argsObj, settings) {
        if (settings === void 0) { settings = {}; }
        if (typeof argsObj === 'string') {
            return parseArgs_1.default(argsObj, {
                definition: settings.definition
            });
        }
        return completeArgsObject_1.default(argsObj || {}, settings);
    }
    return argsToObject;
});
