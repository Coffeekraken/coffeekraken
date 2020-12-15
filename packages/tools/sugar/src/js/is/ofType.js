// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var SType_1 = __importDefault(require("../type/SType"));
    /**
     * @name              ofType
     * @namespace           sugar.js.is
     * @type              Function
     * @beta
     *
     * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
     * if the value pass the test or not...
     *
     * @param       {Mixed}        value          The value to check
     * @param       {String}       typeString      The argument type definition string to use for the test
     * @param       {Object}        [settings={}]         Some settings to configure your type checking
     * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "$expected" and the othet names "$received"
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
     * isOfType(['hello',true], 'Array<String>'); // => { $expected: { type: 'Array<String>' }, $received: { type: 'Array<String|Boolean>' }}
     * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ofType(value, typeString, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ verbose: false }, settings);
        var typeCls = new SType_1.default(typeString, settings);
        var res = typeCls.is(value);
        return res;
    }
    return ofType;
});
//# sourceMappingURL=ofType.js.map