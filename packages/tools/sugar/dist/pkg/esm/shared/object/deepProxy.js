// @ts-nocheck
import __proxyArray from '../array/proxyArray.js';
import __isDomElement from '../is/isDomElement.js';
import __isPlainObject from '../is/isPlainObject.js';
import __clone from '../object/clone.js';
import __deepMap from '../object/deepMap.js';
import __deepMerge from '../object/deepMerge.js';
/**
 * @name                            deepProxy
 * @namespace            shared.object
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        wip
 * @private
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
                // stop here if revoked of does not handle set
                if (isRevoked || !settings.handleSet)
                    return true;
                // stop here if the value are the same already
                if (value === target[key])
                    return true;
                // handle deep proxy
                if (settings.deep &&
                    typeof value === 'object' &&
                    __isPlainObject(value)) {
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
                else if (typeof obj[key] === 'object' &&
                    __isPlainObject(obj[key])) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUVILE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFxQm5DLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQXdDLEVBQUU7SUFFMUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFdBQVcsRUFBRSxLQUFLO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixTQUFTLFdBQVcsQ0FBQyxJQUFJO1FBQ3JCLE9BQU87WUFDSCxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLO2dCQUNsQiw4Q0FBOEM7Z0JBQzlDLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRWxELDhDQUE4QztnQkFDOUMsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFdkMsb0JBQW9CO2dCQUNwQixJQUNJLFFBQVEsQ0FBQyxJQUFJO29CQUNiLE9BQU8sS0FBSyxLQUFLLFFBQVE7b0JBQ3pCLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFDeEI7b0JBQ0UsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCw4QkFBOEI7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFN0Isb0JBQW9CO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUVwQix5Q0FBeUM7Z0JBQ3pDLHFCQUFxQjtnQkFDckIsU0FBUyxDQUFzQjtvQkFDM0IsTUFBTTtvQkFDTixNQUFNO29CQUNOLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLFFBQVE7b0JBQ1IsS0FBSztpQkFDUixDQUFDLENBQUM7Z0JBRUgsZUFBZTtnQkFDZixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBRUQsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDckIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQXNCO3dCQUN6QyxNQUFNO3dCQUNOLE1BQU07d0JBQ04sR0FBRzt3QkFDSCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUM5QixNQUFNLEVBQUUsS0FBSzt3QkFDYixVQUFVLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQyxDQUFDO29CQUNILElBQUksR0FBRyxLQUFLLFFBQVE7d0JBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUM3QyxJQUFJLEtBQUssS0FBSyxTQUFTO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUVELGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRztnQkFDdEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFckQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsd0JBQXdCO29CQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxTQUFTLENBQXNCOzRCQUMzQixNQUFNOzRCQUNOLE1BQU07NEJBQ04sR0FBRzs0QkFDSCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUM5QixNQUFNLEVBQUUsUUFBUTs0QkFDaEIsVUFBVSxFQUFFLGVBQWU7NEJBQzNCLFFBQVE7eUJBQ1gsQ0FBQyxDQUFDO3FCQUNOO29CQUNELE9BQU8sT0FBTyxDQUFDO2lCQUNsQjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSTtRQUN0QixJQUFJLEdBQUcsS0FBSyxJQUFJO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDVixNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMzQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNULFNBQVMsaUJBQ0wsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUMzQixRQUFRLEVBQ2IsQ0FBQztvQkFDUCxDQUFDLENBQ0osQ0FBQztpQkFDTDtxQkFBTSxJQUNILE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7b0JBQzVCLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDM0I7b0JBQ0UsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO1NBQ0o7UUFFRCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsRCx3QkFBd0I7UUFDeEIsTUFBTSxpQkFBaUIsR0FBRztZQUN0QixRQUFRLEVBQUUsSUFBSTtZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsMENBQTBDO2dCQUMxQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5Qyw0QkFBNEI7Z0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO29CQUMzQyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO3dCQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNiO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osU0FBUyxDQUNMLENBQUMsQ0FBQyxLQUFLLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3dCQUNoQixJQUNJLElBQUksS0FBSyxRQUFROzRCQUNqQixPQUFPLEtBQUssS0FBSyxVQUFVLEVBQzdCOzRCQUNFLEtBQUssRUFBRSxDQUFDO3lCQUNYO29CQUNMLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztvQkFDRixrQ0FBa0M7b0JBQ2xDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUM7U0FDSixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM3QixNQUFNLEVBQUUsaUJBQWlCO2FBQzVCLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQyJ9