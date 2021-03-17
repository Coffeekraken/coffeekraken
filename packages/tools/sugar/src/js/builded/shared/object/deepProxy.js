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
                        value = proxify(value, __spreadArray(__spreadArray([], path), [key]));
                    }
                    var oldValue = target[key];
                    target[key] = value;
                    handlerFn({
                        object: object,
                        target: target,
                        key: key,
                        path: __spreadArray(__spreadArray([], path), [key]).join('.'),
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
                            path: __spreadArray(__spreadArray([], path), [key]).join('.'),
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
                                path: __spreadArray(__spreadArray([], path), [key]).join('.'),
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
                            handlerFn(__assign({ path: __spreadArray(__spreadArray([], path), [key]).join('.') }, watchObj));
                        });
                    }
                    else if (typeof obj[key] === 'object') {
                        obj[key] = proxify(obj[key], __spreadArray(__spreadArray([], path), [key]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL29iamVjdC9kZWVwUHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVix5REFBcUM7SUFDckMsOERBQTBDO0lBQzFDLDBEQUFzQztJQUV0QyxrRUFBOEM7SUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ2pELElBQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsSUFBSTtTQUNuQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtZQUN2QixPQUFPO2dCQUNMLEdBQUcsWUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7b0JBQ3BCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBRWxELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7d0JBQzlDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxrQ0FBTSxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7cUJBQ3hDO29CQUVELElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFFcEIsU0FBUyxDQUFDO3dCQUNSLE1BQU0sUUFBQTt3QkFDTixNQUFNLFFBQUE7d0JBQ04sR0FBRyxLQUFBO3dCQUNILElBQUksRUFBRSxnQ0FBSSxJQUFJLElBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQzlCLE1BQU0sRUFBRSxLQUFLO3dCQUNiLFVBQVUsRUFBRSxZQUFZO3dCQUN4QixRQUFRLFVBQUE7d0JBQ1IsS0FBSyxPQUFBO3FCQUNOLENBQUMsQ0FBQztvQkFFSCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVELEdBQUcsWUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVE7b0JBQ3ZCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs0QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFNUMsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDOzRCQUN0QixNQUFNLFFBQUE7NEJBQ04sTUFBTSxRQUFBOzRCQUNOLEdBQUcsS0FBQTs0QkFDSCxJQUFJLEVBQUUsZ0NBQUksSUFBSSxJQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUM5QixNQUFNLEVBQUUsS0FBSzs0QkFDYixVQUFVLEVBQUUsWUFBWTt5QkFDekIsQ0FBQyxDQUFDO3dCQUNILElBQUksR0FBRyxLQUFLLFFBQVE7NEJBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO3dCQUM3QyxJQUFJLEtBQUssS0FBSyxTQUFTOzRCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFDRCxPQUFPLFNBQVMsQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxjQUFjLFlBQUMsTUFBTSxFQUFFLEdBQUc7b0JBQ3hCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBRXJELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQzVCLHdCQUF3Qjt3QkFDeEIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxPQUFPLEVBQUU7NEJBQ1gsU0FBUyxDQUFDO2dDQUNSLE1BQU0sUUFBQTtnQ0FDTixNQUFNLFFBQUE7Z0NBQ04sR0FBRyxLQUFBO2dDQUNILElBQUksRUFBRSxnQ0FBSSxJQUFJLElBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQzlCLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixVQUFVLEVBQUUsZUFBZTtnQ0FDM0IsUUFBUSxVQUFBOzZCQUNULENBQUMsQ0FBQzt5QkFDSjt3QkFDRCxPQUFPLE9BQU8sQ0FBQztxQkFDaEI7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDO1FBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUk7WUFDeEIsSUFBSSxHQUFHLEtBQUssSUFBSTtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUU3QixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0NBQ04sR0FBRztvQkFDWixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ1osTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDM0MsVUFBQyxRQUFROzRCQUNQLFNBQVMsWUFDUCxJQUFJLEVBQUUsZ0NBQUksSUFBSSxJQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQzNCLFFBQVEsRUFDWCxDQUFDO3dCQUNMLENBQUMsQ0FDRixDQUFDO3FCQUNIO3lCQUFNLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0NBQU0sSUFBSSxJQUFFLEdBQUcsR0FBRSxDQUFDO3FCQUM5Qzs7Z0JBZEgsS0FBa0IsVUFBZ0IsRUFBaEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFoQixjQUFnQixFQUFoQixJQUFnQjtvQkFBN0IsSUFBTSxHQUFHLFNBQUE7NEJBQUgsR0FBRztpQkFlYjthQUNGO1lBRUQsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFbEQsd0JBQXdCO1lBQ3hCLElBQU0saUJBQWlCLEdBQUc7Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFlBQVksRUFBRSxLQUFLO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsS0FBSyxFQUFFO29CQUNMLDBDQUEwQztvQkFDMUMsSUFBSSxNQUFNLEdBQUcsZUFBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUMsNEJBQTRCO29CQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixvQkFBb0I7b0JBQ3BCLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTt3QkFDeEMsSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTs0QkFDakQsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDWDt3QkFDRCxPQUFPLEdBQUcsQ0FBQztvQkFDYixDQUFDLENBQUMsQ0FBQztvQkFDSCwwQkFBMEI7b0JBQzFCLFVBQVUsQ0FBQzt3QkFDVCxpQkFBUyxDQUNQLENBQUMsQ0FBQyxLQUFLLEVBQ1AsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7NEJBQ2IsSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtnQ0FDakQsR0FBRyxFQUFFLENBQUM7NkJBQ1A7d0JBQ0gsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO3dCQUNGLGtDQUFrQzt3QkFDbEMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNiLENBQUMsQ0FBQyxDQUFDO29CQUNILDBCQUEwQjtvQkFDMUIsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7YUFDRixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUMvQixNQUFNLEVBQUUsaUJBQWlCO2lCQUMxQixDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==