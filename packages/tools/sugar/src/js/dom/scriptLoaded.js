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
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      scriptLoaded
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Detect when a script has been fully loaded
     *
     * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
     * @return    {Promise}    The promise that will be resolved when the script is fully loaded
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
     * scriptLoaded($script).then(($script) => {
     *   // do something here
     * })
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function loadScript($script) {
        return new SPromise_1.default(function (resolve, reject, trigger, cancel) {
            var done = false;
            $script.onload = handleLoad;
            $script.onreadystatechange = handleReadyStateChange;
            $script.onerror = handleError;
            function handleLoad() {
                if (!done) {
                    done = true;
                    resolve($script);
                }
            }
            function handleReadyStateChange() {
                var state;
                if (!done) {
                    state = $script.readyState;
                    if (state === 'complete') {
                        handleLoad();
                    }
                }
            }
            function handleError(e) {
                if (!done) {
                    done = true;
                    reject(new Error(e));
                }
            }
        }, {
            id: 'scriptLoaded'
        }).on('finally', function () {
            $script.onload = null;
            $script.onreadystatechange = null;
            $script.onerror = null;
        });
    }
    return loadScript;
});
//# sourceMappingURL=module.js.map