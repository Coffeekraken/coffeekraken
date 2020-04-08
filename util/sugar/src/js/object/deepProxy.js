import __proxy from '../array/proxy';

/**
 * @name                            deepProxy
 * @namespace                       sugar.js.object
 * @type                            Function
 * 
 * This function allows you to add Proxy to an object in deep fashion.
 * Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
 * object levels and to new properties as well.
 * 
 * @param          {Object}                 object            The object on which to add the proxy
 * @param           {Object}                handler           The object handler. Support all the native function described here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler
 * @return          {Object}                                  The proxied object
 * 
 * @example           js
 * import deepProxy from '@coffeekraken/sugar/js/object/deepProxy';
 * const a = deepProxy({
 *    hello: 'world'
 * }, {
 *    set: (obj) => {
 *      // do something with the update object
 *    }
 * });
 * a.hello = 'coco';
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) 
 */
export default function deepProxy(object, handlerFn) {
  const preproxy = new WeakMap();
  let proxy = null;

  function makeHandler(path) {
    return {
      set(target, key, value) {

        if (typeof value === 'object') {
          value = proxify(value, [...path, key]);
        }

        const oldValue = target[key];

        target[key] = value;

        handlerFn({
          object: proxy,
          path: [...path, key].join('.'),
          action: 'Object.set',
          oldValue,
          value
        });


        return true;
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          // unproxy(target, key);
          const oldValue = target[key];
          let deleted = Reflect.deleteProperty(target, key);
          if (deleted) {
            handlerFn({
              object: proxy,
              path: [...path, key].join('.'),
              action: 'Object.delete',
              oldValue
            });

          }
          return deleted;
        }
        return false;
      }
    }
  }

  // function unproxy(obj = proxy, key = null) {

  //   let o = key ? obj[key] : obj;

  //   if (key) {
  //     if (preproxy.has(o)) {
  //       o = preproxy.get(o);
  //       preproxy.delete(o);
  //     }
  //   }

  //   for (let k of Object.keys(o)) {
  //     if (typeof o[k] === 'object') {
  //       unproxy(o, k);
  //     }
  //   }

  // }

  function proxify(obj, path) {
    for (let key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {

        obj[key] = __proxy(obj[key]);
        obj[key].watch(Object.getOwnPropertyNames(Array.prototype), (watchObj) => {
          handlerFn({
            path: [...path, key].join('.'),
            ...watchObj,
          });
        });

      } else if (typeof obj[key] === 'object') {
        obj[key] = proxify(obj[key], [...path, key]);
      }
    }
    let p = new Proxy(obj, makeHandler(path));
    preproxy.set(p, obj);
    return p;
  }
  proxy = proxify(object, []);
  return proxy;
}