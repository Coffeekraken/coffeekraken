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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFFQUErQztBQUMvQyxzRUFBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyxvRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUVILE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFVbkMsU0FBd0IsV0FBVyxDQUMvQixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQXdDLEVBQUU7SUFFMUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFdBQVcsRUFBRSxLQUFLO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixTQUFTLFdBQVcsQ0FBQyxJQUFJO1FBQ3JCLE9BQU87WUFDSCxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLO2dCQUNsQiwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMzQixZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDaEM7Z0JBQ0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNuQixPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFFSCw4Q0FBOEM7Z0JBQzlDLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRWxELDhDQUE4QztnQkFDOUMsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFdkMsb0JBQW9CO2dCQUNwQixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUM1QyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO2dCQUVELDhCQUE4QjtnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QixvQkFBb0I7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBRXBCLHlDQUF5QztnQkFDekMscUJBQXFCO2dCQUNyQixTQUFTLENBQUM7b0JBQ04sTUFBTTtvQkFDTixNQUFNO29CQUNOLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLFFBQVE7b0JBQ1IsS0FBSztpQkFDUixDQUFDLENBQUM7Z0JBRUgsZUFBZTtnQkFDZixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBRUQsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDckIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7d0JBQ3BCLE1BQU07d0JBQ04sTUFBTTt3QkFDTixHQUFHO3dCQUNILElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQzlCLE1BQU0sRUFBRSxLQUFLO3dCQUNiLFVBQVUsRUFBRSxZQUFZO3FCQUMzQixDQUFDLENBQUM7b0JBQ0gsSUFBSSxHQUFHLEtBQUssUUFBUTt3QkFBRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzdDLElBQUksS0FBSyxLQUFLLFNBQVM7d0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDO1lBRUQsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHO2dCQUN0QixJQUFJLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUVyRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUMxQix3QkFBd0I7b0JBQ3hCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3BELElBQUksT0FBTyxFQUFFO3dCQUNULFNBQVMsQ0FBQzs0QkFDTixNQUFNOzRCQUNOLE1BQU07NEJBQ04sR0FBRzs0QkFDSCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUM5QixNQUFNLEVBQUUsUUFBUTs0QkFDaEIsVUFBVSxFQUFFLGVBQWU7NEJBQzNCLFFBQVE7eUJBQ1gsQ0FBQyxDQUFDO3FCQUNOO29CQUNELE9BQU8sT0FBTyxDQUFDO2lCQUNsQjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSTtRQUN0QixJQUFJLEdBQUcsS0FBSyxJQUFJO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUEsb0JBQVksRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDVixNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMzQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNULFNBQVMsaUJBQ0wsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUMzQixRQUFRLEVBQ2IsQ0FBQztvQkFDUCxDQUFDLENBQ0osQ0FBQztpQkFDTDtxQkFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO1NBQ0o7UUFFRCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsRCx3QkFBd0I7UUFDeEIsTUFBTSxpQkFBaUIsR0FBRztZQUN0QixRQUFRLEVBQUUsSUFBSTtZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsMENBQTBDO2dCQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFBLGVBQU8sRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzlDLDRCQUE0QjtnQkFDNUIsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDakIsb0JBQW9CO2dCQUNwQixNQUFNLEdBQUcsSUFBQSxpQkFBUyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7b0JBQzNDLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7d0JBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUM7cUJBQ2I7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDO2dCQUNILDBCQUEwQjtnQkFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixJQUFBLGlCQUFTLEVBQ0wsQ0FBQyxDQUFDLEtBQUssRUFDUCxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7d0JBQ2hCLElBQ0ksSUFBSSxLQUFLLFFBQVE7NEJBQ2pCLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFDN0I7NEJBQ0UsS0FBSyxFQUFFLENBQUM7eUJBQ1g7b0JBQ0wsQ0FBQyxFQUNELEVBQUUsQ0FDTCxDQUFDO29CQUNGLGtDQUFrQztvQkFDbEMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUNILDBCQUEwQjtnQkFDMUIsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQztTQUNKLENBQUM7UUFDRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztTQUM1QzthQUFNO1lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQzdCLE1BQU0sRUFBRSxpQkFBaUI7YUFDNUIsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBNUxELDhCQTRMQyJ9