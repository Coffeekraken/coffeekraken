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
function __deepProxy(object, handlerFn, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFFQUErQztBQUMvQyxzRUFBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyxvRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBcUJuQyxTQUF3QixXQUFXLENBQy9CLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBd0MsRUFBRTtJQUUxQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsV0FBVyxFQUFFLEtBQUs7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDckIsT0FBTztZQUNILEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7Z0JBQ2xCLDhDQUE4QztnQkFDOUMsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFbEQsOENBQThDO2dCQUM5QyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUV2QyxvQkFBb0I7Z0JBQ3BCLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQzVDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDMUM7Z0JBRUQsOEJBQThCO2dCQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdCLG9CQUFvQjtnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFcEIseUNBQXlDO2dCQUN6QyxxQkFBcUI7Z0JBQ3JCLFNBQVMsQ0FBc0I7b0JBQzNCLE1BQU07b0JBQ04sTUFBTTtvQkFDTixHQUFHO29CQUNILElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQzlCLE1BQU0sRUFBRSxLQUFLO29CQUNiLFVBQVUsRUFBRSxZQUFZO29CQUN4QixRQUFRO29CQUNSLEtBQUs7aUJBQ1IsQ0FBQyxDQUFDO2dCQUVILGVBQWU7Z0JBQ2YsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVE7Z0JBQ3JCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFNUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFzQjt3QkFDekMsTUFBTTt3QkFDTixNQUFNO3dCQUNOLEdBQUc7d0JBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDOUIsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsVUFBVSxFQUFFLFlBQVk7cUJBQzNCLENBQUMsQ0FBQztvQkFDSCxJQUFJLEdBQUcsS0FBSyxRQUFRO3dCQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDN0MsSUFBSSxLQUFLLEtBQUssU0FBUzt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUM7WUFFRCxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUc7Z0JBQ3RCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRXJELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzFCLHdCQUF3QjtvQkFDeEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxPQUFPLEVBQUU7d0JBQ1QsU0FBUyxDQUFzQjs0QkFDM0IsTUFBTTs0QkFDTixNQUFNOzRCQUNOLEdBQUc7NEJBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDOUIsTUFBTSxFQUFFLFFBQVE7NEJBQ2hCLFVBQVUsRUFBRSxlQUFlOzRCQUMzQixRQUFRO3lCQUNYLENBQUMsQ0FBQztxQkFDTjtvQkFDRCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDdEIsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLElBQUEsc0JBQWMsRUFBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLG9CQUFZLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDM0MsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDVCxTQUFTLGlCQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0IsUUFBUSxFQUNiLENBQUM7b0JBQ1AsQ0FBQyxDQUNKLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEQsd0JBQXdCO1FBQ3hCLE1BQU0saUJBQWlCLEdBQUc7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNSLDBDQUEwQztnQkFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBQSxlQUFPLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5Qyw0QkFBNEI7Z0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsTUFBTSxHQUFHLElBQUEsaUJBQVMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO29CQUMzQyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO3dCQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNiO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBQSxpQkFBUyxFQUNMLENBQUMsQ0FBQyxLQUFLLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3dCQUNoQixJQUNJLElBQUksS0FBSyxRQUFROzRCQUNqQixPQUFPLEtBQUssS0FBSyxVQUFVLEVBQzdCOzRCQUNFLEtBQUssRUFBRSxDQUFDO3lCQUNYO29CQUNMLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztvQkFDRixrQ0FBa0M7b0JBQ2xDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUM7U0FDSixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM3QixNQUFNLEVBQUUsaUJBQWlCO2FBQzVCLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQTlLRCw4QkE4S0MifQ==