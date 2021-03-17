// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
    var uniqid_1 = __importDefault(require("../string/uniqid"));
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
        var watchStack = {};
        // mark that this array has already been proxied
        Object.defineProperty(array, '__$proxied', {
            value: true,
            enumerable: false,
            writable: false
        });
        function _proxyMethod(name) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handlersStack = [];
            Object.keys(watchStack).forEach(function (watchId) {
                var watch = watchStack[watchId];
                if (watch.methods.indexOf(name) === -1)
                    return;
                handlersStack.push({
                    handlerFn: watch.handlerFn,
                    watchObj: {
                        oldValue: __spreadArray([], array),
                        action: "" + name,
                        fullAction: "Array." + name,
                        args: args
                    }
                });
            });
            var returnValue = (_a = Array.prototype[name]).call.apply(_a, __spreadArray([array], args));
            handlersStack.forEach(function (handlerObj) {
                handlerObj.watchObj = __assign(__assign({}, handlerObj.watchObj), { value: array, returnedValue: returnValue });
                handlerObj.handlerFn(handlerObj.watchObj);
            });
            return returnValue;
        }
        Object.getOwnPropertyNames(Array.prototype).forEach(function (methodName) {
            var unProxyMethods = ['length', 'constructor'];
            if (unProxyMethods.indexOf(methodName) !== -1)
                return;
            Object.defineProperty(array, methodName, {
                writable: false,
                configurable: false,
                enumerable: false,
                value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _proxyMethod.apply(void 0, __spreadArray([methodName], args));
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
            value: function (methods, handlerFn) {
                // create a watch id that we send back to the caller
                var watchId = uniqid_1.default();
                // append this watch process
                watchStack[watchId] = {
                    methods: methods,
                    handlerFn: handlerFn
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
            value: function (watchId) {
                // delete the watch process
                delete watchStack[watchId];
            }
        });
        // return the processed array
        return array;
    }
    exports.default = proxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2FycmF5L3Byb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsNERBQXdDO0lBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLO1FBQ2xCLElBQUksS0FBSyxDQUFDLFVBQVU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVuQyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFdEIsZ0RBQWdEO1FBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRTtZQUN6QyxLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILFNBQVMsWUFBWSxDQUFDLElBQUk7O1lBQUUsY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLDZCQUFPOztZQUNqQyxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN0QyxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztvQkFDMUIsUUFBUSxFQUFFO3dCQUNSLFFBQVEsb0JBQU0sS0FBSyxDQUFDO3dCQUNwQixNQUFNLEVBQUUsS0FBRyxJQUFNO3dCQUNqQixVQUFVLEVBQUUs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