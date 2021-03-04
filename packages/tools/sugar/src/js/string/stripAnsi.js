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
        define(["require", "exports", "strip-ansi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strip_ansi_1 = __importDefault(require("strip-ansi"));
    /**
     * @name            stripAnsi
     * @namespace       sugar.js.string
     * @type            Function
     *
     * This function simply strip all the ansi characters in a string
     *
     * @param       {String}        string          The string to strip ansi from
     * @return      {String}                        The new string without any ansi characters
     *
     * @example     js
     * import stripAnsi from '@coffeekraken/sugar/js/string/stripAnsi';
     * stripAnsi('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007'); // => Click
     *
     * @see         https://www.npmjs.com/package/strip-ansi
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function stripAnsi(string) {
        return strip_ansi_1.default(string);
    }
    exports.default = stripAnsi;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBBbnNpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaXBBbnNpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDBEQUFxQztJQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUF3QixTQUFTLENBQUMsTUFBTTtRQUN0QyxPQUFPLG9CQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUZELDRCQUVDIn0=