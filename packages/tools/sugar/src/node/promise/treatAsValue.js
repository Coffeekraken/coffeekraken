"use strict";
// @shared
/**
 * @name           treatAsValue
 * @namespace       sugar.js.promise
 * @type            Function
 * @beta
 *
 * This function allows you to wrap a promise in a ```resolve``` call to prevent
 * this promise to be treated as a "chaining" promise but to be treated as
 * normal value passed in the resolve call.
 *
 * @param           {Promise}          promise          The promise to treat as a simple value
 * @return          {Proxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
 *
 * @example         js
 * import treatAsValue from '@coffeekraken/sugar/js/promise/treatAsValue';
 * await new Promise(resolve => {
 *      const myPromise = new Promise(resolve => {});
 *      resolve(treatAsValue(myPromise));
 * }); // => myPromise
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function treatAsValue(promise) {
    const proxy = new Proxy(promise, {
        get(target, prop, receiver) {
            if (prop === 'then') {
                return target;
            }
            // @ts-ignore
            return Reflect.get(...arguments);
        }
    });
    proxy.revokeProxy = () => {
        return promise;
    };
    return proxy;
};
module.exports = fn;
//# sourceMappingURL=treatAsValue.js.map