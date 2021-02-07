// @shared

/**
 * @name           treatAsValue
 * @namespace       sugar.js.promise
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

export interface ITreatAsValueSettings {
  during?: number;
}

export interface ITreatAsValueProxy extends ProxyConstructor {
  restorePromiseBehavior: Function;
}

export interface ITreatAsValue {
  (promise: any, settings?: ITreatAsValueSettings): ITreatAsValueProxy;
}

const fn: ITreatAsValue = function treatAsValue(
  promise: any,
  settings: ITreatAsValueSettings = {}
): any {
  settings = {
    during: -1,
    ...settings
  };
  let during: number = settings.during || -1;
  try {
    const proxy = Proxy.revocable(promise, {
      get(target, prop, receiver) {
        if (prop === 'then') {
          return target;
        }
        if (during > 0) during--;
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
  } catch (e) {
    return promise;
  }
};
export default fn;
