// @ts-nocheck
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
     * @name          sleep
     * @namespace            js.function
     * @type          Function
     * @stable
     *
     * Simple sleep function that can be used using "await" syntax in an "async" function
     *
     * @param         {Number}          time          The sleep duration in ms
     * @return        {Promise}                       A promise that will be resolved at the end of the sleep time
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import sleep from '@coffeekraken/sugar/js/function/sleep';
     * async function() {
     *  console.log('hello');
     *  await sleep(2000);
     *  console.log('World');
     * }
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }
    exports.default = sleep;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGVlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7UUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=