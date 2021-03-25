// @ts-nocheck
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const parseArgs_1 = __importDefault(require("./parseArgs"));
    const completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
    /**
     * @name                  argsToObject
     * @namespace           sugar.js.cli
     * @type                  Function
     * @status              beta
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
    function argsToObject(argsObj, settings = {}) {
        if (typeof argsObj === 'string') {
            return parseArgs_1.default(argsObj, {
                definition: settings.definition
            });
        }
        return completeArgsObject_1.default(argsObj || {}, settings);
    }
    exports.default = argsToObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUFzQztJQUN0Qyw4RUFBd0Q7SUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBDRztJQUNILFNBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixPQUFPLG1CQUFXLENBQUMsT0FBTyxFQUFFO2dCQUMxQixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLDRCQUFvQixDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELGtCQUFlLFlBQVksQ0FBQyJ9