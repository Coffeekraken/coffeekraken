(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name            isTerminal
     * @namespace       sugar.js.is
     * @type            Function
     *
     * This function simply returns if the process runs inside a terminal or not
     *
     * @return      {Boolean}           true if is in the terminal, false if not
     *
     * @example         js
     * import isTerminal from '@coffeekraken/sugar/js/is/terminal';
     * isTerminal(); // => true
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isTerminal() {
        if (process && process.stdout && process.stdout.isTTY)
            return true;
        return false;
    }
    exports.default = isTerminal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXJtaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFNBQXdCLFVBQVU7UUFDaEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNuRSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFIRCw2QkFHQyJ9