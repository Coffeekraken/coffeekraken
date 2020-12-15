// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
     * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
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
    var fn = function treatAsValue(promise, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ during: -1 }, settings);
        var during = settings.during || -1;
        try {
            var proxy_1 = Proxy.revocable(promise, {
                get: function (target, prop, receiver) {
                    if (prop === 'then') {
                        return target;
                    }
                    if (during > 0)
                        during--;
                    else if (during === 0) {
                        proxy_1.revoke();
                    }
                    // @ts-ignore
                    return Reflect.get.apply(Reflect, arguments);
                }
            });
            proxy_1.proxy.restorePromiseBehavior = function () {
                proxy_1.revoke();
                return promise;
            };
            return proxy_1.proxy;
        }
        catch (e) {
            return promise;
        }
    };
    return fn;
});
//# sourceMappingURL=treatAsValue.js.map