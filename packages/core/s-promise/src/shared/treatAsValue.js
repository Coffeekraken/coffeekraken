/**
 * @name           treatAsValue
 * @namespace       SPromise.js
 * @type            Function
 * @status              beta
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const fn = function treatAsValue(promise, settings = {}) {
        settings = Object.assign({ during: -1 }, settings);
        let during = settings.during || -1;
        try {
            const proxy = Proxy.revocable(promise, {
                get(target, prop, receiver) {
                    if (prop === 'then') {
                        return target;
                    }
                    if (during > 0)
                        during--;
                    else if (during === 0) {
                        proxy.revoke();
                    }
                    // @ts-ignore
                    return Reflect.get(...arguments);
                }
            });
            proxy.proxy.restorePromiseBehavior = () => {
                proxy.revoke();
                return promise;
            };
            return proxy.proxy;
        }
        catch (e) {
            return promise;
        }
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRBc1ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJlYXRBc1ZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHOzs7Ozs7Ozs7Ozs7SUFjSCxNQUFNLEVBQUUsR0FBa0IsU0FBUyxZQUFZLENBQzdDLE9BQVksRUFDWixXQUFrQyxFQUFFO1FBRXBDLFFBQVEsbUJBQ04sTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUNQLFFBQVEsQ0FDWixDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVE7b0JBQ3hCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTt3QkFDbkIsT0FBTyxNQUFNLENBQUM7cUJBQ2Y7b0JBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQzt3QkFBRSxNQUFNLEVBQUUsQ0FBQzt5QkFDcEIsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNyQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCO29CQUNELGFBQWE7b0JBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7YUFDRixDQUFDLENBQUM7WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtnQkFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNmLE9BQU8sT0FBTyxDQUFDO1lBQ2pCLENBQUMsQ0FBQztZQUNGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNwQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxPQUFPLENBQUM7U0FDaEI7SUFDSCxDQUFDLENBQUM7SUFDRixrQkFBZSxFQUFFLENBQUMifQ==