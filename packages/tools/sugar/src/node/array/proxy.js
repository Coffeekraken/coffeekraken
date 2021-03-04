"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("../string/uniqid"));
/**
 * @name                  proxy
 * @namespace           sugar.js.array
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
            const watchId = uniqid_1.default();
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
exports.default = proxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsOERBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLO0lBQ2xCLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVuQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRTtRQUN6QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztJQUVILFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUk7UUFDakMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFDL0MsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDakIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixRQUFRLEVBQUU7b0JBQ1IsUUFBUSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRTtvQkFDakIsVUFBVSxFQUFFLFNBQVMsSUFBSSxFQUFFO29CQUMzQixJQUFJO2lCQUNMO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUUvRCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDbkMsVUFBVSxDQUFDLFFBQVEsbUNBQ2QsVUFBVSxDQUFDLFFBQVEsS0FDdEIsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsV0FBVyxHQUMzQixDQUFDO1lBQ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNqRSxNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUU7WUFDdkMsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUNqQixPQUFPLFlBQVksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNwQyxRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUM1QixvREFBb0Q7WUFDcEQsTUFBTSxPQUFPLEdBQUcsZ0JBQVEsRUFBRSxDQUFDO1lBQzNCLDRCQUE0QjtZQUM1QixVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3BCLE9BQU87Z0JBQ1AsU0FBUzthQUNWLENBQUM7WUFDRiw4REFBOEQ7WUFDOUQsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUVIOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ3RDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakIsMkJBQTJCO1lBQzNCLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDLENBQUM7SUFFSCw2QkFBNkI7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=