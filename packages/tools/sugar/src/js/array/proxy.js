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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
                        oldValue: __spreadArrays(array),
                        action: "" + name,
                        fullAction: "Array." + name,
                        args: args
                    }
                });
            });
            var returnValue = (_a = Array.prototype[name]).call.apply(_a, __spreadArrays([array], args));
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
                    return _proxyMethod.apply(void 0, __spreadArrays([methodName], args));
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
    return proxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViw0REFBd0M7SUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsS0FBSyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxLQUFLLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRW5DLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUV0QixnREFBZ0Q7UUFDaEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFO1lBQ3pDLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsU0FBUyxZQUFZLENBQUMsSUFBSTs7WUFBRSxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAsNkJBQU87O1lBQ2pDLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQ3RDLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUUsT0FBTztnQkFDL0MsYUFBYSxDQUFDLElBQUksQ0FBQztvQkFDakIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO29CQUMxQixRQUFRLEVBQUU7d0JBQ1IsUUFBUSxpQkFBTSxLQUFLLENBQUM7d0JBQ3BCLE1BQU0sRUFBRSxLQUFHLElBQU07d0JBQ2pCLFVBQVUsRUFBRSxXQUFTLElBQU07d0JBQzNCLElBQUksTUFB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