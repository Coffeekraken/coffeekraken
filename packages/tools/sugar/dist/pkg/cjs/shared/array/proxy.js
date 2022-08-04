"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("../string/uniqid"));
/**
 * @name                  proxy
 * @namespace            js.array
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function proxy(array) {
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
exports.default = proxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLO0lBQ2hCLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVuQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRTtRQUN2QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUVILFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUk7UUFDL0IsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFDL0MsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7Z0JBQzFCLFFBQVEsRUFBRTtvQkFDTixRQUFRLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFO29CQUNqQixVQUFVLEVBQUUsU0FBUyxJQUFJLEVBQUU7b0JBQzNCLElBQUk7aUJBQ1A7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRS9ELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNqQyxVQUFVLENBQUMsUUFBUSxtQ0FDWixVQUFVLENBQUMsUUFBUSxLQUN0QixLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxXQUFXLEdBQzdCLENBQUM7WUFDRixVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQy9ELE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtZQUNyQyxRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDN0MsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFDbEMsUUFBUSxFQUFFLEtBQUs7UUFDZixZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDMUIsb0RBQW9EO1lBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUEsZ0JBQVEsR0FBRSxDQUFDO1lBQzNCLDRCQUE0QjtZQUM1QixVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ2xCLE9BQU87Z0JBQ1AsU0FBUzthQUNaLENBQUM7WUFDRiw4REFBOEQ7WUFDOUQsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVIOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ3BDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZiwyQkFBMkI7WUFDM0IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILDZCQUE2QjtJQUM3QixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=