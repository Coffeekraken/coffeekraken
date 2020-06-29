import __proxy from '../array/proxy';
import __deepMap from '../object/deepMap';
import __clone from '../object/clone';
import __delete from '../object/delete';

/**
 * @name                            deepProxy
 * @namespace           js.object
 * @type                            Function
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
 * @return          {Object}                                  The proxied object
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function deepProxy(object, handlerFn) {
  const preproxy = new WeakMap();
  let isRevoked = false;

  function makeHandler(path) {
    return {
      set(target, key, value) {
        if (isRevoked) return true;

        if (typeof value === 'object') {
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

      // get(target, key, receiver) {
      //   if (Reflect.has(target, key)) {
      //     const value = handlerFn({
      //       object,
      //       target,
      //       key,
      //       path: [...path, key].join('.'),
      //       action: 'get',
      //       fullAction: 'Object.get'
      //     });
      //     if (key === 'revoke') return receiver.revoke;
      //     console.log(value, key);
      //     if (value === undefined) return target[key];
      //     return value;
      //   }
      //   return undefined;
      // },

      deleteProperty(target, key) {
        if (isRevoked) return true;

        if (Reflect.has(target, key)) {
          // unproxy(target, key);
          const oldValue = target[key];
          let deleted = Reflect.deleteProperty(target, key);
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
    if (obj === null) return obj;
    for (let key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        obj[key] = __proxy(obj[key]);
        obj[key].watch(
          Object.getOwnPropertyNames(Array.prototype),
          (watchObj) => {
            handlerFn({
              path: [...path, key].join('.'),
              ...watchObj
            });
          }
        );
      } else if (typeof obj[key] === 'object') {
        obj[key] = proxify(obj[key], [...path, key]);
      }
    }
    let p = Proxy.revocable(obj, makeHandler(path));
    preproxy.set(p, obj);
    const revokePropertyObj = {
      writable: true,
      configurable: false,
      enumerable: true,
      value: () => {
        // make a shallow copy of the proxy object
        let __copy = __clone(p.proxy, true);
        // mark the proxy as revoked
        isRevoked = true;
        // sanitize the copy
        __copy = __deepMap(__copy, (val, key, path) => {
          // console.log(path);
          if (key === 'revoke' && typeof val === 'function') {
            return -1;
          }
          return val;
        });
        // deep revoke the proxies
        setTimeout(() => {
          __deepMap(
            p.proxy,
            (val, key, path) => {
              if (key === 'revoke' && typeof val === 'function') {
                val();
              }
            },
            {}
          );
          // revoke the proxy at first level
          p.revoke();
        });
        // return the shallow copy
        return __copy;
      }
    };
    Object.defineProperties(p.proxy, {
      revoke: revokePropertyObj
    });
    return p.proxy;
  }
  return proxify(object, []);
}
