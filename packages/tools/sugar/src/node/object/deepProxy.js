"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const proxy_1 = __importDefault(require("../array/proxy"));
const deepMap_1 = __importDefault(require("../object/deepMap"));
const clone_1 = __importDefault(require("../object/clone"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
function deepProxy(object, handlerFn, settings = {}) {
    const preproxy = new WeakMap();
    let isRevoked = false;
    settings = deepMerge_1.default({
        deep: true,
        handleSet: true,
        handleGet: false,
        handleDelete: true
    }, settings);
    function makeHandler(path) {
        return {
            set(target, key, value) {
                if (isRevoked || !settings.handleSet)
                    return true;
                if (settings.deep && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }
                const oldValue = target[key];
                target[key] = value;
                handlerFn({
                    object,
                    target,
                    key,
                    path: [...path, key].join('.'),
                    action: 'set',
                    fullAction: `Object.set`,
                    oldValue,
                    value
                });
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
                            oldValue
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
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    obj[key] = proxy_1.default(obj[key]);
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
            enumerable: true,
            value: () => {
                // make a shallow copy of the proxy object
                let __copy = clone_1.default(p.proxy, { deep: true });
                // mark the proxy as revoked
                isRevoked = true;
                // sanitize the copy
                __copy = deepMap_1.default(__copy, (val, key, path) => {
                    if (key === 'revoke' && typeof val === 'function') {
                        return -1;
                    }
                    return val;
                });
                // deep revoke the proxies
                setTimeout(() => {
                    deepMap_1.default(p.proxy, (val, key, path) => {
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
module.exports = deepProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDJEQUFxQztBQUNyQyxnRUFBMEM7QUFDMUMsNERBQXNDO0FBRXRDLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pELE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtRQUN2QixPQUFPO1lBQ0wsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFbEQsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDOUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztnQkFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBRXBCLFNBQVMsQ0FBQztvQkFDUixNQUFNO29CQUNOLE1BQU07b0JB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