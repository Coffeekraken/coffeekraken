// @ts-nocheck
// @shared
import __proxy from '../array/proxy';
import __deepMap from '../object/deepMap';
import __clone from '../object/clone';
import __deepMerge from '../object/deepMerge';
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
    settings = __deepMerge({
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
                    obj[key] = __proxy(obj[key]);
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
                let __copy = __clone(p.proxy, { deep: true });
                // mark the proxy as revoked
                isRevoked = true;
                // sanitize the copy
                __copy = __deepMap(__copy, (val, key, path) => {
                    if (key === 'revoke' && typeof val === 'function') {
                        return -1;
                    }
                    return val;
                });
                // deep revoke the proxies
                setTimeout(() => {
                    __deepMap(p.proxy, (val, key, path) => {
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
export default deepProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFFdEMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQy9CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtRQUN2QixPQUFPO1lBQ0wsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFbEQsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDOUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztnQkFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdCLE1B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