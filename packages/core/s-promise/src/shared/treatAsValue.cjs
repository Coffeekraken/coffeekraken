"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRBc1ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXByb21pc2Uvc3JjL3NoYXJlZC90cmVhdEFzVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHOztBQWNILE1BQU0sRUFBRSxHQUFrQixTQUFTLFlBQVksQ0FDN0MsT0FBWSxFQUNaLFdBQWtDLEVBQUU7SUFFcEMsUUFBUSxtQkFDTixNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQ1AsUUFBUSxDQUNaLENBQUM7SUFDRixJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNyQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRO2dCQUN4QixJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ25CLE9BQU8sTUFBTSxDQUFDO2lCQUNmO2dCQUNELElBQUksTUFBTSxHQUFHLENBQUM7b0JBQUUsTUFBTSxFQUFFLENBQUM7cUJBQ3BCLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNoQjtnQkFDRCxhQUFhO2dCQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLENBQUM7U0FDRixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtZQUN4QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDcEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=