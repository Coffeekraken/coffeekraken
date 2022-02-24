// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
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
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        id: 'scriptLoaded',
    }).on('finally', () => {
        $script.onload = null;
        $script.onreadystatechange = null;
        $script.onerror = null;
    });
}
export default loadScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0TG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsVUFBVSxDQUNmLE9BQTBCLEVBQzFCLEVBQUUsR0FBRyxJQUFJO0lBRVQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMxQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFFakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDNUIsT0FBTyxDQUFDLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDO1FBQ3BELE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBRTlCLFNBQVMsVUFBVTtZQUNmLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUU7b0JBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDO1FBRUQsU0FBUyxzQkFBc0I7WUFDM0IsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUMzQixJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7b0JBQ3RCLFVBQVUsRUFBRSxDQUFDO2lCQUNoQjthQUNKO1FBQ0wsQ0FBQztRQUNELFNBQVMsV0FBVyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztJQUNMLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxjQUFjO0tBQ3JCLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=