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
        define(["require", "exports", "mobile-detect"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mobile_detect_1 = __importDefault(require("mobile-detect"));
    /**
     * @name        isTablet
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Detect if is a tablet device
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is a tablet, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isTablet from '@coffeekraken/sugar/js/is/tablet'
     * if (isTablet()) {
     *   // do something cool...
     * }
     *
     * @see       https://www.npmjs.com/package/mobile-detect
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isTablet(ua = navigator.userAgent) {
        const md = new mobile_detect_1.default(ua);
        return md.tablet() !== null;
    }
    exports.default = isTablet;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2lzL3RhYmxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBeUM7SUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUztRQUN4QyxNQUFNLEVBQUUsR0FBRyxJQUFJLHVCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==