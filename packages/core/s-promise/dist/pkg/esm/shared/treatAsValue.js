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
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBY0gsTUFBTSxFQUFFLEdBQWtCLFNBQVMsWUFBWSxDQUMzQyxPQUFZLEVBQ1osV0FBa0MsRUFBRTtJQUVwQyxRQUFRLG1CQUNKLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUNGLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsSUFBSTtRQUNBLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ3RCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDakIsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2dCQUNELElBQUksTUFBTSxHQUFHLENBQUM7b0JBQUUsTUFBTSxFQUFFLENBQUM7cUJBQ3BCLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDbkIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNsQjtnQkFDRCxhQUFhO2dCQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtZQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDdEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sT0FBTyxDQUFDO0tBQ2xCO0FBQ0wsQ0FBQyxDQUFDO0FBQ0YsZUFBZSxFQUFFLENBQUMifQ==