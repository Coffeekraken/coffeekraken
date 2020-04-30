"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepProxy;

var _proxy = _interopRequireDefault(require("../array/proxy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
 * - Object.set: An object property added or updated
 * - Object.delete: An object property deleted
 * - Array.push: An item has been added inside an array
 * - Array.{methodName}: Every array actions
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
function deepProxy(object, handlerFn) {
  const preproxy = new WeakMap();

  function makeHandler(path) {
    return {
      set(target, key, value) {
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
          action: 'Object.set',
          oldValue,
          value
        });
        return true;
      },

      get(target, key) {
        if (Reflect.has(target, key)) {
          const value = handlerFn({
            object,
            target,
            key,
            path: [...path, key].join('.'),
            action: 'Object.get'
          });
          if (value === undefined) return target[key];
          return value;
        }

        return undefined;
      },

      deleteProperty(target, key) {
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
              action: 'Object.delete',
              oldValue
            });
          }

          return deleted;
        }

        return false;
      }

    };
  } // function unproxy(obj = proxy, key = null) {
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
    if (obj === null) return obj;

    for (let key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        obj[key] = (0, _proxy.default)(obj[key]);
        obj[key].watch(Object.getOwnPropertyNames(Array.prototype), watchObj => {
          handlerFn({
            path: [...path, key].join('.'),
            ...watchObj
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

  return proxify(object, []);
}

module.exports = exports.default;