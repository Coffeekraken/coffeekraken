// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      scriptLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform      js
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
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function loadScript($script, cb = null) {
    return new __SPromise(({ resolve, reject, emit }) => {
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
        id: 'scriptLoaded'
    }).on('finally', () => {
        $script.onload = null;
        $script.onreadystatechange = null;
        $script.onerror = null;
    });
}
export default loadScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0TG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsVUFBVSxDQUFDLE9BQTBCLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDdkQsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFFakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDNUIsT0FBTyxDQUFDLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDO1FBQ3BELE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBRTlCLFNBQVMsVUFBVTtZQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQztRQUVELFNBQVMsc0JBQXNCO1lBQzdCLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDM0IsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO29CQUN4QixVQUFVLEVBQUUsQ0FBQztpQkFDZDthQUNGO1FBQ0gsQ0FBQztRQUNELFNBQVMsV0FBVyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQztJQUNILENBQUMsRUFDRDtRQUNFLEVBQUUsRUFBRSxjQUFjO0tBQ25CLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=