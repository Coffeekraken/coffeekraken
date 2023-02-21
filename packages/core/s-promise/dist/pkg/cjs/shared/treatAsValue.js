"use strict";
/**
 * @name           treatAsValue
 * @namespace       SPromise.js
 * @type            Function
 * @platform          node
 * @platform          js
 * @status              beta
 * @private
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
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRzs7QUFjSCxNQUFNLEVBQUUsR0FBa0IsU0FBUyxZQUFZLENBQzNDLE9BQVksRUFDWixXQUFrQyxFQUFFO0lBRXBDLFFBQVEsbUJBQ0osTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJO1FBQ0EsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTtnQkFDdEIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO29CQUNqQixPQUFPLE1BQU0sQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQztvQkFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDcEIsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNuQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2xCO2dCQUNELGFBQWE7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxFQUFFO1lBQ3RDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztLQUN0QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFDTCxDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==