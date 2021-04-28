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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2FycmF5L3Byb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhEQUF3QztJQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSztRQUNsQixJQUFJLEtBQUssQ0FBQyxVQUFVO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFbkMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXRCLGdEQUFnRDtRQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7WUFDekMsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJO1lBQ2pDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUMxQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztvQkFDMUIsUUFBUSxFQUFFO3dCQUNSLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUU7d0JBQ2pCLFVBQVUsRUFBRSxT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