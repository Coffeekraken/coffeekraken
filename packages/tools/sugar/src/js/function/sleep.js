// @ts-nocheck
// @shared
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
    /**
     * @name          sleep
     * @namespace           sugar.js.function
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
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    return sleep;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGVlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7UUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDekIsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFTLEtBQUssQ0FBQyJ9