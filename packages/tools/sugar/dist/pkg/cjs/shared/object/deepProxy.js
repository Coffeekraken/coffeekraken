"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxyArray_1 = __importDefault(require("../array/proxyArray"));
const isDomElement_1 = __importDefault(require("../is/isDomElement"));
const clone_1 = __importDefault(require("../object/clone"));
const deepMap_1 = __importDefault(require("../object/deepMap"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name                            deepProxy
 * @namespace            shared.object
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        wip
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
 * @param         {Object}                [settings={}]         An object of settings to configure your proxy:
 * @return          {Object}                                  The proxied object
 *
 * @setting         {Boolean}         [deep=true]           Specify if you want to watch the passed object deeply or juste the first level
 * @setting        {Boolean}           [handleSet=true]        Specify if you want to handle the "set" action
 * @setting         {Boolean}           [handleGet=false]           Specify if you want to handle the "get" action
 * @setting         {Boolean}           [handleDelete=true]         Specify if you want to handle the "delete" action
 * @setting         {Boolean}            [domElements=false]        Specify if you want to proxy dom elements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __deepProxy } from '@coffeekraken/sugar/object';
 * const a = __deepProxy({
 *    hello: 'world'
 * }, (actionObj) => {
 *    // do something with the actionObj...
 * });
 * a.hello = 'coco';
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _loopTimeout = new WeakMap();
function __deepProxy(object, handlerFn, settings = {}) {
    const preproxy = new WeakMap();
    let isRevoked = false;
    settings = (0, deepMerge_1.default)({
        deep: true,
        handleSet: true,
        handleGet: false,
        handleDelete: true,
        domElements: false,
    }, settings);
    function makeHandler(path) {
        return {
            set(target, key, value) {
                // protect agains set loop
                if (!_loopTimeout.has(target)) {
                    _loopTimeout.set(target, {});
                }
                const dotpath = [...path, key].join('.');
                const timeouts = _loopTimeout.get(target);
                if (timeouts[dotpath]) {
                    return true;
                }
                timeouts[dotpath] = true;
                setTimeout(() => {
                    delete timeouts[dotpath];
                });
                // stop here if revoked of does not handle set
                if (isRevoked || !settings.handleSet)
                    return true;
                // stop here if the value are the same already
                if (value === target[key])
                    return true;
                // handle deep proxy
                if (settings.deep && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }
                // keep track of the old value
                const oldValue = target[key];
                // set the new value
                target[key] = value;
                // call the handler function with all the
                // usefull parameters
                handlerFn({
                    object,
                    target,
                    key,
                    path: [...path, key].join('.'),
                    action: 'set',
                    fullAction: `Object.set`,
                    oldValue,
                    value,
                });
                // write update
                return true;
            },
            get(target, key, receiver) {
                if (Reflect.has(target, key)) {
                    if (!settings.handleGet)
                        return target[key];
                    const value = handlerFn({
                        object,
                        target,
                        key,
                        path: [...path, key].join('.'),
                        action: 'get',
                        fullAction: 'Object.get',
                    });
                    if (key === 'revoke')
                        return receiver.revoke;
                    if (value === undefined)
                        return target[key];
                    return value;
                }
                return undefined;
            },
            deleteProperty(target, key) {
                if (isRevoked || !settings.handleDelete)
                    return true;
                if (Reflect.has(target, key)) {
                    // unproxy(target, key);
                    const oldValue = target[key];
                    const deleted = Reflect.deleteProperty(target, key);
                    if (deleted) {
                        handlerFn({
                            object,
                            target,
                            key,
                            path: [...path, key].join('.'),
                            action: 'delete',
                            fullAction: 'Object.delete',
                            oldValue,
                        });
                    }
                    return deleted;
                }
                return false;
            },
        };
    }
    function proxify(obj, path) {
        if (obj === null)
            return obj;
        if (!settings.domElements && (0, isDomElement_1.default)(obj)) {
            return obj;
        }
        if (settings.deep) {
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    obj[key] = (0, proxyArray_1.default)(obj[key]);
                    obj[key].watch(Object.getOwnPropertyNames(Array.prototype), (watchObj) => {
                        handlerFn(Object.assign({ path: [...path, key].join('.') }, watchObj));
                    });
                }
                else if (typeof obj[key] === 'object') {
                    obj[key] = proxify(obj[key], [...path, key]);
                }
            }
        }
        const p = Proxy.revocable(obj, makeHandler(path));
        // preproxy.set(p, obj);
        const revokePropertyObj = {
            writable: true,
            configurable: false,
            enumerable: false,
            value: () => {
                // make a shallow copy of the proxy object
                let __copy = (0, clone_1.default)(p.proxy, { deep: true });
                // mark the proxy as revoked
                isRevoked = true;
                // sanitize the copy
                __copy = (0, deepMap_1.default)(__copy, ({ value, prop }) => {
                    if (prop === 'revoke' && typeof value === 'function') {
                        return -1;
                    }
                    return value;
                });
                // deep revoke the proxies
                setTimeout(() => {
                    (0, deepMap_1.default)(p.proxy, ({ value, prop }) => {
                        if (prop === 'revoke' &&
                            typeof value === 'function') {
                            value();
                        }
                    }, {});
                    // revoke the proxy at first level
                    p.revoke();
                });
                // return the shallow copy
                return __copy;
            },
        };
        if (Array.isArray(p.proxy)) {
            p.proxy.revoke = revokePropertyObj.value;
        }
        else {
            Object.defineProperties(p.proxy, {
                revoke: revokePropertyObj,
            });
        }
        return p.proxy;
    }
    return proxify(object, []);
}
exports.default = __deepProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFFQUErQztBQUMvQyxzRUFBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyxvRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUVILE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFFbkMsU0FBd0IsV0FBVyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsV0FBVyxFQUFFLEtBQUs7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDckIsT0FBTztZQUNILEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7Z0JBQ2xCLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzNCLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztn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