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
    /**
     * @name            wait
     * @namespace           sugar.js.time
     * @type            Function
     * @async
     * @stable
     *
     * This function is a simple "setTimeout" wrapper inside a promise.
     *
     * @param         {Number}        timeout       The timeout to wait in ms
     * @return        {Promise}                     A simple promise resolved once the timeout is finished
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import wait from '@coffeekraken/sugar/js/time/wait';
     * await wait(2000);
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function wait(timeout) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    }
    return wait;
});
