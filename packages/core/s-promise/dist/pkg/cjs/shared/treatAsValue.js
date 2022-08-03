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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRzs7QUFjSCxNQUFNLEVBQUUsR0FBa0IsU0FBUyxZQUFZLENBQzdDLE9BQVksRUFDWixXQUFrQyxFQUFFO0lBRXBDLFFBQVEsbUJBQ04sTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUNQLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDckMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTtnQkFDeEIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO29CQUNuQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtnQkFDRCxJQUFJLE1BQU0sR0FBRyxDQUFDO29CQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUNwQixJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7Z0JBQ0QsYUFBYTtnQkFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLEVBQUU7WUFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3BCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLE9BQU8sQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9