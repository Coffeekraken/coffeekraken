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
        define(["require", "exports", "../string/uniqid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const uniqid_1 = __importDefault(require("../string/uniqid"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBd0M7SUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsS0FBSyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxLQUFLLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRW5DLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUV0QixnREFBZ0Q7UUFDaEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFO1lBQ3pDLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSTtZQUNqQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPO2dCQUMvQyxhQUFhLENBQUMsSUFBSSxDQUFDO29CQUNqQixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7b0JBQzFCLFFBQVEsRUFBRTt3QkFDUixRQUFRLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFO3dCQUNqQixVQUFVLEVBQUUsU0FBUyxJQUFJLEVBQUU7d0JBQzNCLElBQUk7cUJBQ0w7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUUvRCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ25DLFVBQVUsQ0FBQyxRQUFRLG1DQUNkLFVBQVUsQ0FBQyxRQUFRLEtBQ3RCLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLFdBQVcsR0FDM0IsQ0FBQztnQkFDRixVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2pFLE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUU7Z0JBQ3ZDLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFlBQVksRUFBRSxLQUFLO2dCQUNuQixVQUFVLEVBQUUsS0FBSztnQkFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtvQkFDakIsT0FBTyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBc0JHO1FBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUM1QixvREFBb0Q7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLGdCQUFRLEVBQUUsQ0FBQztnQkFDM0IsNEJBQTRCO2dCQUM1QixVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7b0JBQ3BCLE9BQU87b0JBQ1AsU0FBUztpQkFDVixDQUFDO2dCQUNGLDhEQUE4RDtnQkFDOUQsT0FBTyxPQUFPLENBQUM7WUFDakIsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVIOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ3RDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pCLDJCQUEyQjtnQkFDM0IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxLQUFLLENBQUMifQ==