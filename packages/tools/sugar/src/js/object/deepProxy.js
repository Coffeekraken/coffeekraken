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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = deepProxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVix5REFBcUM7SUFDckMsOERBQTBDO0lBQzFDLDBEQUFzQztJQUV0QyxrRUFBOEM7SUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ2pELElBQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsSUFBSTtTQUNuQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtZQUN2QixPQUFPO2dCQUNMLEdBQUcsWUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7b0JBQ3BCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBRWxELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7d0JBQzlDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxpQkFBTSxJQUFJLEdBQUUsR0FBRyxHQUFFLENBQUM7cUJBQ3hDO29CQUVELElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFFcEIsU0FBUyxDQUFDO3dCQUNSLE1BQU0sUUFBQTt3QkFDTixNQUFNLFFBQUE7d0JBQ04sR0FBRyxLQUFBO3dCQUNILElBQUksRUFBRSxlQUFJLElBQUksR0FBRSxHQUFHLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDOUIsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsVUFBVSxFQUFFLFlBQVk7d0JBQ3hCLFFBQVEsVUFBQTt3QkFDUixLQUFLLE9BQUE7cUJBQ04sQ0FBQyxDQUFDO29CQUVILE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQsR0FBRyxZQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUTtvQkFDdkIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzRCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUU1QyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7NEJBQ3RCLE1BQU0sUUFBQTs0QkFDTixNQUFNLFFBQUE7NEJBQ04sR0FBRyxLQUFBOzRCQUNILElBQUksRUFBRSxlQUFJLElBQUksR0FBRSxHQUFHLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDOUIsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsVUFBVSxFQUFFLFlBQVk7eUJBQ3pCLENBQUMsQ0FBQzt3QkFDSCxJQUFJLEdBQUcsS0FBSyxRQUFROzRCQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDN0MsSUFBSSxLQUFLLEtBQUssU0FBUzs0QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7b0JBQ0QsT0FBTyxTQUFTLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsY0FBYyxZQUFDLE1BQU0sRUFBRSxHQUFHO29CQUN4QixJQUFJLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZO3dCQUFFLE9BQU8sSUFBSSxDQUFDO29CQUVyRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUM1Qix3QkFBd0I7d0JBQ3hCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3BELElBQUksT0FBTyxFQUFFOzRCQUNYLFNBQVMsQ0FBQztnQ0FDUixNQUFNLFFBQUE7Z0NBQ04sTUFBTSxRQUFBO2dDQUNOLEdBQUcsS0FBQTtnQ0FDSCxJQUFJLEVBQUUsZUFBSSxJQUFJLEdBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQzlCLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixVQUFVLEVBQUUsZUFBZTtnQ0FDM0IsUUFBUSxVQUFBOzZCQUNULENBQUMsQ0FBQzt5QkFDSjt3QkFDRCxPQUFPLE9BQU8sQ0FBQztxQkFDaEI7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDO1FBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUk7WUFDeEIsSUFBSSxHQUFHLEtBQUssSUFBSTtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUU3QixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0NBQ04sR0FBRztvQkFDWixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ1osTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDM0MsVUFBQyxRQUFROzRCQUNQLFNBQVMsWUFDUCxJQUFJLEVBQUUsZUFBSSxJQUFJLEdBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0IsUUFBUSxFQUNYLENBQUM7d0JBQ0wsQ0FBQyxDQUNGLENBQUM7cUJBQ0g7eUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7d0JBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTSxJQUFJLEdBQUUsR0FBRyxHQUFFLENBQUM7cUJBQzlDOztnQkFkSCxLQUFrQixVQUFnQixFQUFoQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO29CQUE3QixJQUFNLEdBQUcsU0FBQTs0QkFBSCxHQUFHO2lCQWViO2FBQ0Y7WUFFRCxJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsRCx3QkFBd0I7WUFDeEIsSUFBTSxpQkFBaUIsR0FBRztnQkFDeEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsMENBQTBDO29CQUMxQyxJQUFJLE1BQU0sR0FBRyxlQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM5Qyw0QkFBNEI7b0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsTUFBTSxHQUFHLGlCQUFTLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO3dCQUN4QyxJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFOzRCQUNqRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3lCQUNYO3dCQUNELE9BQU8sR0FBRyxDQUFDO29CQUNiLENBQUMsQ0FBQyxDQUFDO29CQUNILDBCQUEwQjtvQkFDMUIsVUFBVSxDQUFDO3dCQUNULGlCQUFTLENBQ1AsQ0FBQyxDQUFDLEtBQUssRUFDUCxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs0QkFDYixJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO2dDQUNqRCxHQUFHLEVBQUUsQ0FBQzs2QkFDUDt3QkFDSCxDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7d0JBQ0Ysa0NBQWtDO3dCQUNsQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2IsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsMEJBQTBCO29CQUMxQixPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQzthQUNGLENBQUM7WUFDRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sRUFBRSxpQkFBaUI7aUJBQzFCLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9