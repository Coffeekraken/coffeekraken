// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
    var fn = function treatAsValue(promise) {
        var proxy = new Proxy(promise, {
            get: function (target, prop, receiver) {
                if (prop === 'then') {
                    return target;
                }
                // @ts-ignore
                return Reflect.get.apply(Reflect, arguments);
            }
        });
        proxy.revokeProxy = function () {
            return promise;
        };
        return proxy;
    };
    return fn;
});
//# sourceMappingURL=treatAsValue.js.map