// @ts-nocheck
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
        // console.log(Object.getOwnPropertyNames(Array.prototype));
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
         * - method (null) {String}: The method name that causes the watch trigger
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
