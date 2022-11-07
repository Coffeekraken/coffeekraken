// @ts-nocheck
import __proxyArray from '../array/proxyArray';
import __isDomElement from '../is/isDomElement';
import __clone from '../object/clone';
import __deepMap from '../object/deepMap';
import __deepMerge from '../object/deepMerge';
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
export default function __deepProxy(object, handlerFn, settings = {}) {
    let isRevoked = false;
    settings = __deepMerge({
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
        if (!settings.domElements && __isDomElement(obj)) {
            return obj;
        }
        if (settings.deep) {
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    obj[key] = __proxyArray(obj[key]);
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
                let __copy = __clone(p.proxy, { deep: true });
                // mark the proxy as revoked
                isRevoked = true;
                // sanitize the copy
                __copy = __deepMap(__copy, ({ value, prop }) => {
                    if (prop === 'revoke' && typeof value === 'function') {
                        return -1;
                    }
                    return value;
                });
                // deep revoke the proxies
                setTimeout(() => {
                    __deepMap(p.proxy, ({ value, prop }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQVVuQyxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUF3QyxFQUFFO0lBRTFDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixXQUFXLEVBQUUsS0FBSztLQUNyQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUyxXQUFXLENBQUMsSUFBSTtRQUNyQixPQUFPO1lBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSztnQkFDbEIsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDbkIsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsOENBQThDO2dCQUM5QyxJQUFJLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUVsRCw4Q0FBOEM7Z0JBQzlDLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRXZDLG9CQUFvQjtnQkFDcEIsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDNUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCw4QkFBOEI7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFN0Isb0JBQW9CO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUVwQix5Q0FBeUM7Z0JBQ3pDLHFCQUFxQjtnQkFDckIsU0FBUyxDQUFDO29CQUNOLE1BQU07b0JBQ04sTUFBTTtvQkFDTixHQUFHO29CQUNILElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQzlCLE1BQU0sRUFBRSxLQUFLO29CQUNiLFVBQVUsRUFBRSxZQUFZO29CQUN4QixRQUFRO29CQUNSLEtBQUs7aUJBQ1IsQ0FBQyxDQUFDO2dCQUVILGVBQWU7Z0JBQ2YsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVE7Z0JBQ3JCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFNUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDO3dCQUNwQixNQUFNO3dCQUNOLE1BQU07d0JBQ04sR0FBRzt3QkFDSCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUM5QixNQUFNLEVBQUUsS0FBSzt3QkFDYixVQUFVLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQyxDQUFDO29CQUNILElBQUksR0FBRyxLQUFLLFFBQVE7d0JBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUM3QyxJQUFJLEtBQUssS0FBSyxTQUFTO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUVELGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRztnQkFDdEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFckQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsd0JBQXdCO29CQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxTQUFTLENBQUM7NEJBQ04sTUFBTTs0QkFDTixNQUFNOzRCQUNOLEdBQUc7NEJBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDOUIsTUFBTSxFQUFFLFFBQVE7NEJBQ2hCLFVBQVUsRUFBRSxlQUFlOzRCQUMzQixRQUFRO3lCQUNYLENBQUMsQ0FBQztxQkFDTjtvQkFDRCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDdEIsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDM0MsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDVCxTQUFTLGlCQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0IsUUFBUSxFQUNiLENBQUM7b0JBQ1AsQ0FBQyxDQUNKLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEQsd0JBQXdCO1FBQ3hCLE1BQU0saUJBQWlCLEdBQUc7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNSLDBDQUEwQztnQkFDMUMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsNEJBQTRCO2dCQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixvQkFBb0I7Z0JBQ3BCLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTt3QkFDbEQsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDYjtvQkFDRCxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsMEJBQTBCO2dCQUMxQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLFNBQVMsQ0FDTCxDQUFDLENBQUMsS0FBSyxFQUNQLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTt3QkFDaEIsSUFDSSxJQUFJLEtBQUssUUFBUTs0QkFDakIsT0FBTyxLQUFLLEtBQUssVUFBVSxFQUM3Qjs0QkFDRSxLQUFLLEVBQUUsQ0FBQzt5QkFDWDtvQkFDTCxDQUFDLEVBQ0QsRUFBRSxDQUNMLENBQUM7b0JBQ0Ysa0NBQWtDO29CQUNsQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsMEJBQTBCO2dCQUMxQixPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDO1NBQ0osQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1NBQzVDO2FBQU07WUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDN0IsTUFBTSxFQUFFLGlCQUFpQjthQUM1QixDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLENBQUMifQ==