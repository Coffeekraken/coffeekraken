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
        return new SPromise_1.default(function (_a) {
            var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0TG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUVBQTZDO0lBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsVUFBVSxDQUFDLE9BQU87UUFDekIsT0FBTyxJQUFJLGtCQUFVLENBQ25CLFVBQUMsRUFBeUI7Z0JBQXZCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtZQUN0QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7WUFFakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDNUIsT0FBTyxDQUFDLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDO1lBQ3BELE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBRTlCLFNBQVMsVUFBVTtnQkFDakIsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEI7WUFDSCxDQUFDO1lBRUQsU0FBUyxzQkFBc0I7Z0JBQzdCLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQzNCLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTt3QkFDeEIsVUFBVSxFQUFFLENBQUM7cUJBQ2Q7aUJBQ0Y7WUFDSCxDQUFDO1lBQ0QsU0FBUyxXQUFXLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNaLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0QjtZQUNILENBQUM7UUFDSCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsY0FBYztTQUNuQixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBUyxVQUFVLENBQUMifQ==