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
        define(["require", "exports", "../array/proxy", "../object/deepMap", "../object/clone", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
     * @param         {Object}                [settings={}]         An object of settings to configure your proxy:
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
                    __copy = deepMap_1.default(__copy, ({ value, prop }) => {
                        if (prop === 'revoke' && typeof value === 'function') {
                            return -1;
                        }
                        return value;
                    });
                    // deep revoke the proxies
                    setTimeout(() => {
                        deepMap_1.default(p.proxy, ({ value, prop }) => {
                            if (prop === 'revoke' && typeof value === 'function') {
                                value();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJEQUFxQztJQUNyQyxnRUFBMEM7SUFDMUMsNERBQXNDO0lBRXRDLG9FQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2pELE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsSUFBSTtTQUNuQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtZQUN2QixPQUFPO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7b0JBQ3BCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBRWxELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7d0JBQzlDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDeEM7b0JBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUVwQixTQUFTLENBQUM7d0JBQ1IsTUFBTTt3QkFDTixNQUFNO3dC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