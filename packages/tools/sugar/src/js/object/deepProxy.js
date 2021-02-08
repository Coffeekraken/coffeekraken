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
        define(["require", "exports", "../array/proxy", "../object/deepMap", "../object/clone", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var proxy_1 = __importDefault(require("../array/proxy"));
    var deepMap_1 = __importDefault(require("../object/deepMap"));
    var clone_1 = __importDefault(require("../object/clone"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name                            deepProxy
     * @namespace           sugar.js.object
     * @type                            Function
     * @status              wip
     *
     * This function allows you to add Proxy to an object in deep fashion.
     * Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
     * object levels and to new properties as well.
     *
     * On the returned proxied object, you will have access to the ```revoke``` method that you can call to revoke the proxy applied.
     * This method will return you a shallow version of the proxied object that you can use as you want
     *
     * @param          {Object}                 object            The object on which to add the proxy
     * @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
     * - set: An object property added or updated
     * - delete: An object property deleted
     * - push: An item has been added inside an array
     * - {methodName}: Every array actions
     * @param         {Object}                [settings={}]         An object of settings to configure your proxy:
     * - deep (true) {Boolean}: Specify if you want to watch the passed object deeply or juste the first level
     * - handleSet (true) {Boolean}: Specify if you want to handle the "set" action
     * - handleGet (false) {Boolean}: Specify if you want to handle the "get" action
     * - handleDelete (true) {Boolean}: Specify if you want to handle the "delete" action
     * @return          {Object}                                  The proxied object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import deepProxy from '@coffeekraken/sugar/js/object/deepProxy';
     * const a = deepProxy({
     *    hello: 'world'
     * }, (actionObj) => {
     *    // do something with the actionObj...
     * });
     * a.hello = 'coco';
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepProxy(object, handlerFn, settings) {
        if (settings === void 0) { settings = {}; }
        var preproxy = new WeakMap();
        var isRevoked = false;
        settings = deepMerge_1.default({
            deep: true,
            handleSet: true,
            handleGet: false,
            handleDelete: true
        }, settings);
        function makeHandler(path) {
            return {
                set: function (target, key, value) {
                    if (isRevoked || !settings.handleSet)
                        return true;
                    if (settings.deep && typeof value === 'object') {
                        value = proxify(value, __spreadArrays(path, [key]));
                    }
                    var oldValue = target[key];
                    target[key] = value;
                    handlerFn({
                        object: object,
                        target: target,
                        key: key,
                        path: __spreadArrays(path, [key]).join('.'),
                        action: 'set',
                        fullAction: "Object.set",
                        oldValue: oldValue,
                        value: value
                    });
                    return true;
                },
                get: function (target, key, receiver) {
                    if (Reflect.has(target, key)) {
                        if (!settings.handleGet)
                            return target[key];
                        var value = handlerFn({
                            object: object,
                            target: target,
                            key: key,
                            path: __spreadArrays(path, [key]).join('.'),
                            action: 'get',
                            fullAction: 'Object.get'
                        });
                        if (key === 'revoke')
                            return receiver.revoke;
                        if (value === undefined)
                            return target[key];
                        return value;
                    }
                    return undefined;
                },
                deleteProperty: function (target, key) {
                    if (isRevoked || !settings.handleDelete)
                        return true;
                    if (Reflect.has(target, key)) {
                        // unproxy(target, key);
                        var oldValue = target[key];
                        var deleted = Reflect.deleteProperty(target, key);
                        if (deleted) {
                            handlerFn({
                                object: object,
                                target: target,
                                key: key,
                                path: __spreadArrays(path, [key]).join('.'),
                                action: 'delete',
                                fullAction: 'Object.delete',
                                oldValue: oldValue
                            });
                        }
                        return deleted;
                    }
                    return false;
                }
            };
        }
        function proxify(obj, path) {
            if (obj === null)
                return obj;
            if (settings.deep) {
                var _loop_1 = function (key) {
                    if (Array.isArray(obj[key])) {
                        obj[key] = proxy_1.default(obj[key]);
                        obj[key].watch(Object.getOwnPropertyNames(Array.prototype), function (watchObj) {
                            handlerFn(__assign({ path: __spreadArrays(path, [key]).join('.') }, watchObj));
                        });
                    }
                    else if (typeof obj[key] === 'object') {
                        obj[key] = proxify(obj[key], __spreadArrays(path, [key]));
                    }
                };
                for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                    var key = _a[_i];
                    _loop_1(key);
                }
            }
            var p = Proxy.revocable(obj, makeHandler(path));
            // preproxy.set(p, obj);
            var revokePropertyObj = {
                writable: true,
                configurable: false,
                enumerable: true,
                value: function () {
                    // make a shallow copy of the proxy object
                    var __copy = clone_1.default(p.proxy, { deep: true });
                    // mark the proxy as revoked
                    isRevoked = true;
                    // sanitize the copy
                    __copy = deepMap_1.default(__copy, function (val, key, path) {
                        if (key === 'revoke' && typeof val === 'function') {
                            return -1;
                        }
                        return val;
                    });
                    // deep revoke the proxies
                    setTimeout(function () {
                        deepMap_1.default(p.proxy, function (val, key, path) {
                            if (key === 'revoke' && typeof val === 'function') {
                                val();
                            }
                        }, {});
                        // revoke the proxy at first level
                        p.revoke();
                    });
                    // return the shallow copy
                    return __copy;
                }
            };
            if (Array.isArray(p.proxy)) {
                p.proxy.revoke = revokePropertyObj.value;
            }
            else {
                Object.defineProperties(p.proxy, {
                    revoke: revokePropertyObj
                });
            }
            return p.proxy;
        }
        return proxify(object, []);
    }
    return deepProxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHlEQUFxQztJQUNyQyw4REFBMEM7SUFDMUMsMERBQXNDO0lBRXRDLGtFQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDakQsSUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1NBQ25CLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixTQUFTLFdBQVcsQ0FBQyxJQUFJO1lBQ3ZCLE9BQU87Z0JBQ0wsR0FBRyxZQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSztvQkFDcEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzt3QkFBRSxPQUFPLElBQUksQ0FBQztvQkFFbEQsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDOUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLGlCQUFNLElBQUksR0FBRSxHQUFHLEdBQUUsQ0FBQztxQkFDeEM7b0JBRUQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUVwQixTQUFTLENBQUM7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