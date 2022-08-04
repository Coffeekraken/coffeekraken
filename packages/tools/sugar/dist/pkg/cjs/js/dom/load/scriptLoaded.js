"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name      scriptLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect when a script has been fully loaded
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
 * @param       {Function}      [cb=null]     A callback if you prefer
 * @return    {Promise}    The promise that will be resolved when the script is fully loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/load/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function loadScript($script, cb = null) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        let done = false;
        $script.onload = handleLoad;
        $script.onreadystatechange = handleReadyStateChange;
        $script.onerror = handleError;
        function handleLoad() {
            if (!done) {
                done = true;
                if (cb)
                    cb($script);
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
        id: 'scriptLoaded',
    }).on('finally', () => {
        $script.onload = null;
        $script.onreadystatechange = null;
        $script.onerror = null;
    });
}
exports.default = loadScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsVUFBVSxDQUNmLE9BQTBCLEVBQzFCLEVBQUUsR0FBRyxJQUFJO0lBRVQsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDMUIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQztRQUNwRCxPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUU5QixTQUFTLFVBQVU7WUFDZixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztRQUVELFNBQVMsc0JBQXNCO1lBQzNCLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDM0IsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO29CQUN0QixVQUFVLEVBQUUsQ0FBQztpQkFDaEI7YUFDSjtRQUNMLENBQUM7UUFDRCxTQUFTLFdBQVcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUM7SUFDTCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsY0FBYztLQUNyQixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNsQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxrQkFBZSxVQUFVLENBQUMifQ==