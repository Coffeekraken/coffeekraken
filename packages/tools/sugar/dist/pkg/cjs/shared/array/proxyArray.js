"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("../string/uniqid"));
/**
 * @name                  proxyArray
 * @namespace            shared.array
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status              wip
 *
 * This function override the passed array prototype to intercept changes made through
 *
 * @param         {Array}           array           The array to proxy
 * @return        {Array}                           The same array with his prototype proxied
 *
 * @example       js
 * import { __proxyArray } from '@coffeekraken/sugar/array';
 * const myArray = __proxyArray([1,2,3]);
 * myArray.watch(['push','pop'], (watchObj) => {
 *    // check the watchObj action
 *    switch (watchObj.action) {
 *      case 'push':
 *        // do something...
 *      break;
 *    }
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __proxyArray(array) {
    if (array.__$proxied)
        return array;
    const watchStack = {};
    // mark that this array has already been proxied
    Object.defineProperty(array, '__$proxied', {
        value: true,
        enumerable: false,
        writable: false,
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
                    args,
                },
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
            },
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    Object.defineProperty(array, 'watch', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: (methods, handlerFn) => {
            // create a watch id that we send back to the caller
            const watchId = (0, uniqid_1.default)();
            // append this watch process
            watchStack[watchId] = {
                methods,
                handlerFn,
            };
            // return the watchId to be able to unwatcn this watch process
            return watchId;
        },
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    Object.defineProperty(array, 'unwatch', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: (watchId) => {
            // delete the watch process
            delete watchStack[watchId];
        },
    });
    // return the processed array
    return array;
}
exports.default = __proxyArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixZQUFZLENBQUMsS0FBSztJQUN0QyxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFbkMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXRCLGdEQUFnRDtJQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7UUFDdkMsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFFSCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJO1FBQy9CLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixRQUFRLEVBQUU7b0JBQ04sUUFBUSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRTtvQkFDakIsVUFBVSxFQUFFLFNBQVMsSUFBSSxFQUFFO29CQUMzQixJQUFJO2lCQUNQO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUUvRCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDakMsVUFBVSxDQUFDLFFBQVEsbUNBQ1osVUFBVSxDQUFDLFFBQVEsS0FDdEIsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsV0FBVyxHQUM3QixDQUFDO1lBQ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUMvRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUU7WUFDckMsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUNmLE9BQU8sWUFBWSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQzFCLG9EQUFvRDtZQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFRLEdBQUUsQ0FBQztZQUMzQiw0QkFBNEI7WUFDNUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUNsQixPQUFPO2dCQUNQLFNBQVM7YUFDWixDQUFDO1lBQ0YsOERBQThEO1lBQzlELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FDSixDQUFDLENBQUM7SUFFSDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtRQUNwQyxRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2YsMkJBQTJCO1lBQzNCLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FDSixDQUFDLENBQUM7SUFFSCw2QkFBNkI7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQTFIRCwrQkEwSEMifQ==