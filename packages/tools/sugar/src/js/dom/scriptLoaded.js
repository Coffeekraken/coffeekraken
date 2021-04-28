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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9zY3JpcHRMb2FkZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsVUFBVSxDQUFDLE9BQU87UUFDekIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBRWpCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQztZQUNwRCxPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUU5QixTQUFTLFVBQVU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDWixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xCO1lBQ0gsQ0FBQztZQUVELFNBQVMsc0JBQXNCO2dCQUM3QixJQUFJLEtBQUssQ0FBQztnQkFDVixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUMzQixJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7d0JBQ3hCLFVBQVUsRUFBRSxDQUFDO3FCQUNkO2lCQUNGO1lBQ0gsQ0FBQztZQUNELFNBQVMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDWixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEI7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLGNBQWM7U0FDbkIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=