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
        define(["require", "exports", "../type/SType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SType_1 = __importDefault(require("../type/SType"));
    /**
     * @name              ofType
     * @namespace           sugar.js.is
     * @type              Function
     * @status              beta
     *
     * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
     * if the value pass the test or not...
     *
     * @param       {Mixed}        value          The value to check
     * @param       {String}       typeString      The argument type definition string to use for the test
     * @param       {Object}        [settings={}]         Some settings to configure your type checking
     * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "expected" and the othet names "received"
     *
     * @param     {Boolean}       [verbose=false]       Specify if you want to get back just "false", or an object describing the issue
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isOfType from '@coffeekraken/sugar/js/is/ofType';
     * ifOfType(true, 'Boolean'); // => true
     * isOfType(12, 'String|Number'); // => true
     * isOfType(['hello',true], 'Array<String>'); // => { expected: { type: 'Array<String>' }, received: { type: 'Array<String|Boolean>' }}
     * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ofType(value, typeString, settings = {}) {
        settings = Object.assign({ verbose: false }, settings);
        const typeInstance = new SType_1.default(typeString, settings);
        const res = typeInstance.is(value);
        return res;
    }
    exports.default = ofType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2ZUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlDLFFBQVEsbUJBQ04sT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLENBQ1osQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxNQUFNLEdBQUcsR0FBWSxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9