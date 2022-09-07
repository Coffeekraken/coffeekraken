"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name      whenScriptLoaded
 * @namespace            js.dom.detect
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
 * import { __whenScriptLoaded } from '@coffeekraken/sugar/dom'
 * __whenScriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenScriptLoaded($script, cb = null) {
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
        id: 'whenScriptLoaded',
    }).on('finally', () => {
        $script.onload = null;
        $script.onreadystatechange = null;
        $script.onerror = null;
    });
}
exports.default = __whenScriptLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLGtCQUFrQixDQUN0QyxPQUEwQixFQUMxQixFQUFFLEdBQUcsSUFBSTtJQUVULE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzFCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVqQixPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUM1QixPQUFPLENBQUMsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUM7UUFDcEQsT0FBTyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFFOUIsU0FBUyxVQUFVO1lBQ2YsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRTtvQkFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUM7UUFFRCxTQUFTLHNCQUFzQjtZQUMzQixJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQzNCLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTtvQkFDdEIsVUFBVSxFQUFFLENBQUM7aUJBQ2hCO2FBQ0o7UUFDTCxDQUFDO1FBQ0QsU0FBUyxXQUFXLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLGtCQUFrQjtLQUN6QixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNsQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE1Q0QscUNBNENDIn0=