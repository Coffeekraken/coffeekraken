// @ts-nocheck
import __uniqid from '../string/uniqid';
/**
 * @name                  proxy
 * @namespace            js.array
 * @type                  Function
 * @status              wip
 *
 * This function override the passed array prototype to intercept changes made through
 *
 * @param         {Array}           array           The array to proxy
 * @return        {Array}                           The same array with his prototype proxied
 *
 * @example       js
 * import proxy from '@coffeekraken/sugar/js/array/proxy';
 * const myArray = proxy([1,2,3]);
 * myArray.watch(['push','pop'], (watchObj) => {
 *    // check the watchObj action
 *    switch (watchObj.action) {
 *      case 'push':
 *        // do something...
 *      break;
 *    }
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function proxy(array) {
    if (array.__$proxied)
        return array;
    const watchStack = {};
    // mark that this array has already been proxied
    Object.defineProperty(array, '__$proxied', {
        value: true,
        enumerable: false,
        writable: false
    });
    function _proxyMethod(name, ...args) {
        const handlersStack = [];
        Object.keys(watchStack).forEach((watchId) => {
            const watch = watchStack[watchId];
            if (watch.methods.indexOf(name) === -1)
                return;
            handlersStack.push({
                handlerFn: watch.handlerFn,
                watchObj: {
                    oldValue: [...array],
                    action: `${name}`,
                    fullAction: `Array.${name}`,
                    args
                }
            });
        });
        const returnValue = Array.prototype[name].call(array, ...args);
        handlersStack.forEach((handlerObj) => {
            handlerObj.watchObj = Object.assign(Object.assign({}, handlerObj.watchObj), { value: array, returnedValue: returnValue });
            handlerObj.handlerFn(handlerObj.watchObj);
        });
        return returnValue;
    }
    Object.getOwnPropertyNames(Array.prototype).forEach((methodName) => {
        const unProxyMethods = ['length', 'constructor'];
        if (unProxyMethods.indexOf(methodName) !== -1)
            return;
        Object.defineProperty(array, methodName, {
            writable: false,
            configurable: false,
            enumerable: false,
            value: (...args) => {
                return _proxyMethod(methodName, ...args);
            }
        });
    });
    /**
     * @name                    watch
     * @type                    Function
     *
     * This method allows you to specify which Array methods you want to watch by passing an array of methods names like ['push','pop'].
     * You can also specify the handler function that will be called on each array updates, etc...
     *
     * @param         {Array|String}          methods               The methods you want to watch
     * @param         {Function}              handler               The function that will be called on each updates. This function will be called with an object as parameters. Here's the list of properties available:
     * - method (null) {String}: The method name that causes the watch emit
     * - args ([]) {Array}: An array of all the arguments passed to the method call
     * - oldValue (null) {Array}: The array just before the method call
     * - value (null) {Array}: The array after the method call
     * - returnedValue (null) {Mixed}: This is the value that the method call has returned
     * @return        {String}                                    Return a uniq watchid that you can use to unwatch this process
     *
     * @example         js
     * const watchId = myProxiedArray.watch(['push', 'pop'], (watchObj) => {
     *    // do something...
     * });
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    Object.defineProperty(array, 'watch', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: (methods, handlerFn) => {
            // create a watch id that we send back to the caller
            const watchId = __uniqid();
            // append this watch process
            watchStack[watchId] = {
                methods,
                handlerFn
            };
            // return the watchId to be able to unwatcn this watch process
            return watchId;
        }
    });
    /**
     * @name                  unwatch
     * @type                  Function
     *
     * This methods allows you to unwatch a process started with the "watch" method.
     * You have to pass as parameter the watchId that the "watch" method has returned you.
     *
     * @param       {String}          watchId         The watchId returned by the "watch" method
     *
     * @example       js
     * const watchId = myArray.watch('push', (obj) => //...);
     * myArray.unwatch(watchId);
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    Object.defineProperty(array, 'unwatch', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: (watchId) => {
            // delete the watch process
            delete watchStack[watchId];
        }
    });
    // return the processed array
    return array;
}
export default proxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2FycmF5L3Byb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSztJQUNsQixJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFbkMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXRCLGdEQUFnRDtJQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7UUFDekMsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDLENBQUM7SUFFSCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzFDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDMUIsUUFBUSxFQUFFO29CQUNSLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUU7b0JBQ2pCLFVBQVUsRUFBRSxTQUFTLElBQUksRUFBRTtvQkFDM0IsSUFBSTtpQkFDTDthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFL0QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ25DLFVBQVUsQ0FBQyxRQUFRLG1DQUNkLFVBQVUsQ0FBQyxRQUFRLEtBQ3RCLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLFdBQVcsR0FDM0IsQ0FBQztZQUNGLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDakUsTUFBTSxjQUFjLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakQsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDdEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFO1lBQ3ZDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDakIsT0FBTyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFDcEMsUUFBUSxFQUFFLEtBQUs7UUFDZixZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDNUIsb0RBQW9EO1lBQ3BELE1BQU0sT0FBTyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQzNCLDRCQUE0QjtZQUM1QixVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3BCLE9BQU87Z0JBQ1AsU0FBUzthQUNWLENBQUM7WUFDRiw4REFBOEQ7WUFDOUQsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUVIOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ3RDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakIsMkJBQTJCO1lBQzNCLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDLENBQUM7SUFFSCw2QkFBNkI7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==