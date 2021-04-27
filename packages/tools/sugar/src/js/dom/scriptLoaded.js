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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      scriptLoaded
     * @namespace            js.dom
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
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            let done = false;
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
                let state;
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
        }).on('finally', () => {
            $script.onload = null;
            $script.onreadystatechange = null;
            $script.onerror = null;
        });
    }
    exports.default = loadScript;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0TG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxPQUFPO1FBQ3pCLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztZQUVqQixPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUM1QixPQUFPLENBQUMsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUM7WUFDcEQsT0FBTyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFFOUIsU0FBUyxVQUFVO2dCQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNsQjtZQUNILENBQUM7WUFFRCxTQUFTLHNCQUFzQjtnQkFDN0IsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDM0IsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO3dCQUN4QixVQUFVLEVBQUUsQ0FBQztxQkFDZDtpQkFDRjtZQUNILENBQUM7WUFDRCxTQUFTLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RCO1lBQ0gsQ0FBQztRQUNILENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxjQUFjO1NBQ25CLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9