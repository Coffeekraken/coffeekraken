"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_1 = __importDefault(require("../array/proxy"));
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepProxy(object, handlerFn, settings = {}) {
    const preproxy = new WeakMap();
    let isRevoked = false;
    settings = (0, deepMerge_1.default)({
        deep: true,
        handleSet: true,
        handleGet: false,
        handleDelete: true,
    }, settings);
    function makeHandler(path) {
        return {
            set(target, key, value) {
                if (isRevoked || !settings.handleSet)
                    return true;
                if (value === target[key])
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
                    value,
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
        if (settings.deep) {
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    obj[key] = (0, proxy_1.default)(obj[key]);
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
exports.default = deepProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJEQUFxQztBQUNyQyw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBQzFDLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDckIsT0FBTztZQUNILEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUs7Z0JBQ2xCLElBQUksU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRWxELElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRXZDLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQzVDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDMUM7Z0JBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUVwQixTQUFTLENBQUM7b0JBQ04sTUFBTTtvQkFDTixNQUFNO29CQUNOLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLFFBQVE7b0JBQ1IsS0FBSztpQkFDUixDQUFDLENBQUM7Z0JBRUgsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVE7Z0JBQ3JCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFNUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDO3dCQUNwQixNQUFNO3dCQUNOLE1BQU07d0JBQ04sR0FBRzt3QkFDSCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUM5QixNQUFNLEVBQUUsS0FBSzt3QkFDYixVQUFVLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQyxDQUFDO29CQUNILElBQUksR0FBRyxLQUFLLFFBQVE7d0JBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUM3QyxJQUFJLEtBQUssS0FBSyxTQUFTO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUVELGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRztnQkFDdEIsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFckQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsd0JBQXdCO29CQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxTQUFTLENBQUM7NEJBQ04sTUFBTTs0QkFDTixNQUFNOzRCQUNOLEdBQUc7NEJBQ0gsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDOUIsTUFBTSxFQUFFLFFBQVE7NEJBQ2hCLFVBQVUsRUFBRSxlQUFlOzRCQUMzQixRQUFRO3lCQUNYLENBQUMsQ0FBQztxQkFDTjtvQkFDRCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDdEIsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBRTdCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSxlQUFPLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDM0MsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDVCxTQUFTLGlCQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0IsUUFBUSxFQUNiLENBQUM7b0JBQ1AsQ0FBQyxDQUNKLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEQsd0JBQXdCO1FBQ3hCLE1BQU0saUJBQWlCLEdBQUc7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNSLDBDQUEwQztnQkFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBQSxlQUFPLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5Qyw0QkFBNEI7Z0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsTUFBTSxHQUFHLElBQUEsaUJBQVMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO29CQUMzQyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO3dCQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNiO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBQSxpQkFBUyxFQUNMLENBQUMsQ0FBQyxLQUFLLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3dCQUNoQixJQUNJLElBQUksS0FBSyxRQUFROzRCQUNqQixPQUFPLEtBQUssS0FBSyxVQUFVLEVBQzdCOzRCQUNFLEtBQUssRUFBRSxDQUFDO3lCQUNYO29CQUNMLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztvQkFDRixrQ0FBa0M7b0JBQ2xDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCwwQkFBMEI7Z0JBQzFCLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUM7U0FDSixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM3QixNQUFNLEVBQUUsaUJBQWlCO2FBQzVCLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9