// @shared
// @ts-nocheck

import __minimatch from 'minimatch';
import __deepMerge from '../object/deepMerge';
import __uniqid from '../string/uniqid';
import __wait from '../time/wait';
import __toString from '../string/toString';
import __env from '../core/env';
import __treatAsValue, {
  ITreatAsValue,
  ITreatAsValueProxy,
  ITreatAsValueSettings
} from './treatAsValue';
import __SEventEmitter from '../event/SEventEmitter';
import __SClass from '../class/SClass';

/**
 * @name                  SPromise
 * @namespace           sugar.js.promise
 * @type                  Class
 * @status                beta
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "resolve", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger) => { trigger('resolve', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger) => { trigger('reject', 'myCoolValue') }).catch(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "canceled" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... });
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... });
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... });
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then:2', value => { ... }).on('then:1,catch', value => { ... });
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      });
 *      console.log(result); // => helloWorldPromise
 *    ```
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "pipe" capabilities on events to allow for "throttle", "debounce", etc...
 * @feature       Something cool
 *
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something'); *
 *        }, 1000);
 *    });
 * }
 *
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).then(1, value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

type ISPromiseStateType =
  | 'pending'
  | 'resolved'
  | 'rejected'
  | 'canceled'
  | 'destroyed';

export interface ISPromiseSettings {
  destroyTimeout: number;
  [key: string]: any;
}

export interface ISPromiseConstructorSettings {
  [key: string]: any;
  promise: ISPromiseSettings;
}

export interface ISPromiseResolveFn {
  (arg: any, stacksOrder: string): Promise<any>;
}
export interface ISPromiseRejectFn {
  (arg: any, stacksOrder: string): Promise<any>;
}
export interface ISPromiseCancelFn {
  (arg: any): void;
}

export interface ISPromiseExecutorFn {
  (
    resolve: ISPromiseResolveFn,
    reject: ISPromiseRejectFn,
    api: ISPromise
  ): void;
}

export interface ISPromiseResolvers {
  reject: Function;
  resolve: Function;
}

export interface ISPromiseCtor extends Promise {
  new (settings?: ISPromiseConstructorSettings): ISPromise;
}

export interface ISPromise {
  _promiseState: ISPromiseStateType;
  _resolvers?: ISPromiseResolvers;
  readonly promiseState: string;
  then(...args): any;
  is(status: ISPromiseStateType): boolean;
  isPending(): boolean;
  isResolved(): boolean;
  isRejected(): boolean;
  isCanceled(): boolean;
  isDestroyed(): boolean;
  resolve: ISPromiseResolveFn;
  reject: ISPromiseRejectFn;
  cancel: ISPromiseCancelFn;
  catch(...args: any): ISPromise;
  finally(...args: any): ISPromise;
  resolved(...args: any): ISPromise;
  rejected(...args: any): ISPromise;
  canceled(...args: any): ISPromise;
}

class SPromise extends __SClass.extends(Promise) {
  /**
   * @name        treatAsValue
   * @type        Function
   * @static
   *
   * This function allows you to wrap a promise in a ```resolve``` call to prevent
   * this promise to be treated as a "chaining" promise but to be treated as
   * normal value passed in the resolve call.
   *
   * @param           {Promise}          promise          The promise to treat as a simple value
   * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
   *
   * @since      2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static treatAsValue(
    promise: Promise<any>,
    settings: ITreatAsValueSettings = {}
  ): ITreatAsValueProxy {
    return __treatAsValue(promise, settings);
  }

  private _promiseState: ISPromiseStateType = 'pending';
  private _resolvers: ISPromiseResolvers;

  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
   *
   * @example       js
   * const promise = new SPromise((resolve, reject, trigger, cancel, promise) => {
   *    // do something...
   * }).then(value => {
   *    // do something...
   * }).finally(value => {
   *    // do something...
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(executorFnOrSettings = {}, settings = {}) {
    const _resolve = (arg: any, stacksOrder?: string) => {
      setTimeout(() => {
        this.resolve(arg, stacksOrder);
      }, 100);
    };
    // @ts-ignore
    const _reject = (arg: any, stacksOrder?: string) => {
      setTimeout(() => {
        this.reject(arg, stacksOrder);
      });
    };
    // @ts-ignore
    let executorFn,
      _this,
      resolvers: any = {};
    super(
      __deepMerge(
        {
          promise: {
            treatCancelAs: 'resolve',
            destroyTimeout: 5000
          }
        },
        typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {},
        settings
      ),
      (resolve, reject) => {
        resolvers.resolve = resolve;

        new Promise((rejectPromiseResolve, rejectPromiseReject) => {
          resolvers.reject = rejectPromiseReject;
        }).catch((e) => {
          this.emit('catch', e);
        });

        const _api = new Proxy(
          {},
          {
            get(target, prop) {
              if (_this !== undefined) {
                return _this[prop];
              } else {
                return async (...args) => {
                  await __wait(0);
                  return _this[prop](...args);
                };
              }
            }
          }
        );

        executorFn =
          typeof executorFnOrSettings === 'function'
            ? executorFnOrSettings
            : null;
        if (executorFn) {
          return executorFn(_resolve, _reject, _api);
        }
      }
    );

    _this = this;

    this.expose(new __SEventEmitter(this._settings), {
      as: 'eventEmitter',
      props: ['on', 'off', 'emit']
    });

    this._resolvers = <ISPromiseResolvers>resolvers;

    if (
      (<ISPromiseConstructorSettings>this._settings).promise.destroyTimeout !==
      -1
    ) {
      this.on('finally', (v, m) => {
        setTimeout(() => {
          this._destroy();
        }, (<ISPromiseConstructorSettings>this._settings).promise.destroyTimeout);
      });
    }
  }

  /**
   * @name                    promiseState
   * @type                    String
   * @get
   *
   * Access the promise state. Can be one of these:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get promiseState() {
    return this._promiseState;
  }

  /**
   * @name                  treatAsValue
   * @type                  Function
   *
   * This method wrap the promise into a revocable proxy to allow
   * passing this Promise to methods like ```then```, etc... and make
   * this promise treated as a value and not as a chained promise.
   * Once you have done with this behavior, you just have to call
   * the ```restorePromiseBehavior``` on the returned proxy and
   * the default promise behavior will be restored
   *
   * @param         {ITreatAsValueSettings}       [settings={}]     Some settings to configure your custom behavior
   * @return        {ITreatAsValueProxy}                            A custom proxy that you can revoke using the ```restorePromiseBehavior```
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  treatAsValue(settings: ITreatAsValueSettings = {}): ITreatAsValueProxy {
    return __treatAsValue(this, settings);
  }

  /**
   * @name                  is
   * @type                  Function
   *
   * Check is the promise is on one of the passed status
   *
   * @param       {String}        status        A comma separated list of status to check
   * @return      {Boolean}                     Return true if the promise is in one of the passed status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  is(status) {
    const statusArray = status.split(',').map((l) => l.trim());
    if (statusArray.indexOf(this._promiseState) !== -1) return true;
    return false;
  }

  /**
   * @name                  isPending
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isPending() {
    return this._promiseState === 'pending';
  }

  /**
   * @name                  isResolved
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isResolved() {
    return this._promiseState === 'resolved';
  }

  /**
   * @name                  isRejected
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isRejected() {
    return this._promiseState === 'rejected';
  }

  /**
   * @name                  isCanceled
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isCanceled() {
    return this._promiseState === 'canceled';
  }

  /**
   * @name                  isDestroyed
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isDestroyed() {
    return this._promiseState === 'destroyed';
  }

  /**
   * @name          resolve
   * @type          Function
   * @async
   *
   * This is the "resolve" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  resolve(arg, stacksOrder = 'resolve,finally') {
    return this._resolve(arg, stacksOrder);
  }

  /**
   * @name          _resolve
   * @type          Function
   * @private
   * @async
   *
   * This is the method that will be called by the promise executor passed resolve function
   *
   * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _resolve(arg, stacksOrder = 'resolve,finally') {
    if (this._promiseState === 'destroyed') return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'resolved';
      // exec the wanted stacks
      const stacksResult = await this.eventEmitter._emitEvents(
        stacksOrder,
        arg
      );
      // resolve the master promise
      this._resolvers.resolve(stacksResult);
      // return the stack result
      resolve(stacksResult);
    });
  }

  /**
   * @name          reject
   * @type          Function
   * @async
   *
   * This is the "reject" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}      A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  reject(arg, stacksOrder = `catch,reject,finally`) {
    return this._reject(arg, stacksOrder);
  }

  /**
   * @name          _reject
   * @type          Function
   * @private
   * @async
   *
   * This is the method that will be called by the promise executor passed reject function
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,error,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _reject(arg, stacksOrder = `catch,reject,finally`) {
    if (this._promiseState === 'destroyed') return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'rejected';
      // exec the wanted stacks
      const stacksResult = await this.eventEmitter._emitEvents(
        stacksOrder,
        arg
      );
      // resolve the master promise
      this._resolvers.reject(stacksResult);
      // return the stack result
      resolve(stacksResult);
    });
  }

  /**
   * @name          cancel
   * @type          Function
   * @async
   *
   * This is the "cancel" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  cancel(arg, stacksOrder = 'cancel,finally') {
    return this._cancel(arg, stacksOrder);
  }

  /**
   * @name            _cancel
   * @type            Function
   * @private
   * @async
   *
   * Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks
   *
   * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _cancel(arg, stacksOrder = 'cancel,finally') {
    if (this._promiseState === 'destroyed') return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'canceled';
      // exec the wanted stacks
      const stacksResult = await this.eventEmitter._emitEvents(
        stacksOrder,
        arg
      );
      // resolve the master promise
      if (this._settings.promise.treatCancelAs === 'reject') {
        this._resolvers.reject(stacksResult);
      } else {
        this._resolvers.resolve(stacksResult);
      }
      // return the stack result
      resolve(stacksResult);
    });
  }

  /**
   * @name                catch
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise((resolve, reject, trigge) => {
   *    // do something...
   *    reject('hello world');
   * }).catch(value => {
   *    // do something with the value that is "hello world"
   * }).catch(1, value => {
   *    // do something that will be executed only once
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  catch(...args) {
    return this.on('catch', ...args);
  }

  /**
   * @name                finally
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).finally(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  finally(...args) {
    return this.on('finally', ...args);
  }

  /**
   * @name                resolved
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).resolved(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  resolved(...args) {
    return this.on('resolve', ...args);
  }

  /**
   * @name                rejected
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).rejected(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  rejected(...args) {
    return this.on('reject', ...args);
  }

  /**
   * @name                canceled
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
   *
   * @example         js
   * new SPromise((resolve, reject, trigger, api) => {
   *    // do something...
   *    api.cancel('hello world');
   * }).canceled(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  canceled(...args) {
    return this.on('cancel', ...args);
  }

  /**
   * @name                      _destroy
   * @type                      Function
   *
   * Destroying the SPromise instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _destroy() {
    // update the status
    this._promiseState = 'destroyed';

    // destroying all the callbacks stacks registered
    this._settings.promise = undefined;
  }
}

export default SPromise;
