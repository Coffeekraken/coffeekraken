// @ts-nocheck
// @shared

import __minimatch from 'minimatch';
import __deepMerge from '../object/deepMerge';
import __uniqid from '../string/uniqid';
import __wait from '../time/wait';
import __toString from '../string/toString';
import __env from '../core/env';
import __treatAsValue from './treatAsValue';
import {
  ITreatAsValueSettings,
  ITreatAsValueProxy
} from './interface/ITreatAsValue';

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
export = class SPromise extends Promise {
  /**
   * @name                  _settings
   * @type                  Object
   * @private
   *
   * Store the settings of this SPromise instance. Here's the available settings:
   * - stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _settings = {};

  /**
   * @name                  _promiseState
   * @type                  String
   * @private
   *
   * Store the promise status. Can be:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _promiseState = 'pending';

  /**
   * @name                  pipe
   * @type                  Function
   * @static
   *
   * This static function allows you to redirect some SPromise "events" to another SPromise instance
   * with the ability to process the linked value before triggering it on the destination SPromise.
   *
   * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
   * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
   * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
   * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
   * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
   * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the triggered value and the metas object. You must return true or false depending if you want to pipe the particular event or not
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static pipe(sourceSPromise, destSPromise, settings = {}) {
    // settings
    settings = __deepMerge(
      {
        stacks: '*',
        prefixStack: true,
        processor: null,
        exclude: [],
        filter: null
      },
      settings
    );
    if (
      !(sourceSPromise instanceof SPromise) ||
      !(destSPromise instanceof SPromise)
    )
      return;
    // listen for all on the source promise
    sourceSPromise.on(settings.stacks, (value, metas) => {
      // check excluded stacks
      if (settings.exclude.indexOf(metas.stack) !== -1) return;
      // check if we have a filter setted
      if (settings.filter && !settings.filter(value, metas)) return;
      // check if need to process the value
      if (settings.processor) {
        const res = settings.processor(value, metas);
        if (Array.isArray(res) && res.length === 2) {
          value = res[0];
          metas = res[1];
        } else {
          value = res;
        }
      }

      // append the source promise id to the stack
      let triggerStack = metas.stack;
      if (settings.prefixStack) {
        if (typeof settings.prefixStack === 'string') {
          triggerStack = `${settings.prefixStack}.${metas.stack}`;
        } else {
          triggerStack = `${sourceSPromise.id}.${metas.stack}`;
        }
        metas.stack = triggerStack;
      }

      // trigger on the destination promise
      destSPromise.trigger(metas.stack, value, {
        ...metas,
        level: metas.level + 1
      });
    });
  }

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
    promise: Promise,
    settings: ITreatAsValueSettings = {}
  ): ITreatAsValueProxy {
    return __treatAsValue(promise, settings);
  }

  /**
   * @name          _buffer
   * @type          Array
   * @private
   *
   * Store all the triggered data that does not have any registered listener
   * and that match with the ```settings.bufferedStacks``` stack
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _buffer = [];

  /**
   * @name          _stacks
   * @type          Array
   * @private
   *
   * Store all the registered stacks with their callStack, callback, etc...
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _stacks = {};

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
    const _resolve = (...args) => {
      setTimeout(() => {
        this.resolve(...args);
      }, 100);
    };
    const _reject = (...args) => {
      setTimeout(() => {
        this.reject(...args);
      });
    };
    const _trigger = (...args) => {
      setTimeout(() => {
        this.trigger(...args);
      });
    };
    const _cancel = (...args) => {
      setTimeout(() => {
        this.cancel(...args);
      });
    };
    const _pipe = (...args) => {
      setTimeout(() => {
        this.pipe(...args);
      });
    };

    const resolvers = {};
    let executorFn, _this;
    super((resolve, reject) => {
      resolvers.resolve = resolve;

      new Promise((rejectPromiseResolve, rejectPromiseReject) => {
        resolvers.reject = rejectPromiseReject;
      }).catch((e) => {
        this.trigger('catch', e);
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
        return executorFn(_resolve, _reject, _trigger, _api);
      }
    });

    _this = this;

    Object.defineProperty(this, '_resolvers', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: resolvers
    });
    Object.defineProperty(this, '_promiseState', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: 'pending'
    });
    Object.defineProperty(this, '_stacks', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: {
        catch: {
          buffer: [],
          callStack: []
        },
        resolve: {
          buffer: [],
          callStack: []
        },
        reject: {
          buffer: [],
          callStack: []
        },
        finally: {
          buffer: [],
          callStack: []
        },
        cancel: {
          buffer: [],
          callStack: []
        }
      }
    });

    Object.defineProperty(this, '_settings', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: __deepMerge(
        {
          treatCancelAs: 'resolve',
          bufferTimeout: 100,
          bufferedStacks: [
            'log',
            '*.log',
            'warn',
            '*.warn',
            'error',
            '*.error'
          ],
          defaultCallTime: {
            finally: 1,
            reject: 1,
            resolve: 1,
            catch: 1,
            cancel: 1
          },
          destroyTimeout: 5000,
          id: __uniqid()
        },
        typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {},
        settings
      )
    });

    if (this._settings.destroyTimeout !== -1) {
      this.on('finally', () => {
        setTimeout(() => {
          this._destroy();
        }, this._settings.destroyTimeout);
      });
    }
  }

  /**
   * @name                    id
   * @type                    String
   * @get
   *
   * Access the promise id
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get id() {
    return this._settings.id;
  }

  // then(...args) {
  //   super.then(...args);
  // }

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
   * @name          pipe
   * @type          Function
   *
   * This method take an SPromise instance as parameter on which to pipe the
   * specified stacks using the settings.stacks property.
   * It is exactly the same as the static ```pipe``` method but for this
   * particular instance.
   *
   * @param       {SPromise}      input      The input promise on which to pipe the events in this one
   * @param       {Object}      [settings={}]    An object ob settings to configure the pipe process:
   * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
   * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
   * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the triggered value and the metas object. You must return true or false depending if you want to pipe the particular event or not
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipe(input, settings = {}) {
    SPromise.pipe(input, this, settings);
    return this;
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
    if (this._isDestroyed) return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'resolved';
      // exec the wanted stacks
      const stacksResult = await this._triggerStacks(stacksOrder, arg);
      // // set the promise in the stack result proto
      // if (stacksResult !== undefined) {
      //   stacksResult.__proto__.promise = this;
      // }
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
    if (this._isDestroyed) return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'rejected';
      // exec the wanted stacks
      const stacksResult = await this._triggerStacks(stacksOrder, arg);
      // // set the promise in the stack result proto
      // if (stacksResult !== undefined) {
      //   stacksResult.__proto__.promise = this;
      // }
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
    if (this._isDestroyed) return;
    return new Promise(async (resolve, reject) => {
      // update the status
      this._promiseState = 'canceled';
      // exec the wanted stacks
      const stacksResult = await this._triggerStacks(stacksOrder, arg);
      // set the promise in the stack result proto
      // if (stacksResult !== undefined) {
      //   stacksResult.__proto__.promise = this;
      // }
      // resolve the master promise
      if (this._settings.treatCancelAs === 'reject') {
        this._resolvers.reject(stacksResult);
      } else {
        this._resolvers.resolve(stacksResult);
      }
      // return the stack result
      resolve(stacksResult);
    });
  }

  /**
   * @name          trigger
   * @type          Function
   * @async
   *
   * This is the method that allows you to trigger the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
   *
   * @param         {String|Array}        what            The callbacks that you want to trigger. Can be catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['catch','finally'], or a string like "catch,finally"
   * @param         {Mixed}         arg         The argument you want to pass to the callback
   * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
   *
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    setTimeout(() => {
   *      resolve('something');
   *    }, 2000);
   * }).then(value => {
   *    // do something with one time "something"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async trigger(what, arg, metas = {}) {
    if (this._isDestroyed) return;

    let treatAsValue = arg !== undefined;

    if (treatAsValue) {
      arg = __treatAsValue(arg);
    }

    // triger the passed stacks
    let res = this._triggerStacks(what, arg, metas);
    if (res && res.restorePromiseBehavior) {
      res = res.restorePromiseBehavior();
    }
    return res;
  }

  /**
   * @name            _registerNewStacks
   * @type            Function
   * @private
   *
   * This methods allows you to register new stacks.
   * A new stack can be called then using the "on('stackName', ...)" method,
   * or directly on the SPromise instance like so "myPromise.stackName(...)".
   *
   * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
   * @return      {SPromise}                        The SPromise instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerNewStacks(stacks) {
    // split the stacks order
    if (typeof stacks === 'string')
      stacks = stacks.split(',').map((s) => s.trim());
    stacks.forEach((stack) => {
      if (!this._stacks[stack]) {
        this._stacks[stack] = {
          buffer: [],
          callStack: []
        };
      }
    });
  }

  /**
   * @name            _registerCallbackInStack
   * @type            Function
   *
   * This function take as argument a stack array and register into it the passed callback function
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerCallbackInStack(stack, callback, settings = {}) {
    settings = {
      callNumber: undefined,
      ...settings
    };

    if (this._isDestroyed) {
      throw new Error(
        `Sorry but you can't call the "${stack}" method on this SPromise cause it has been destroyed...`
      );
    }
    // make sure the stack exist
    if (!this._stacks[stack]) {
      this._registerNewStacks(stack);
    }

    let stackObj = this._stacks[stack];
    let callNumber = settings.callNumber;

    // process the args
    if (
      callNumber === undefined &&
      this._settings.defaultCallTime[stack] !== undefined
    ) {
      callNumber = this._settings.defaultCallTime[stack];
    } else if (callNumber === undefined) {
      callNumber = -1;
    }

    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function')
      stackObj.callStack.push({
        callback,
        callNumber,
        called: 0
      });

    // check if a buffer exists for this particular stack
    if (this._buffer.length > 0) {
      setTimeout(() => {
        this._buffer = this._buffer.filter((item) => {
          if (__minimatch(item.stack, stack)) {
            this.trigger(item.stack, item.value);
            return false;
          }
          return true;
        });
      }, this._settings.bufferTimeout);
    }

    // maintain chainability
    return this;
  }

  /**
   * @name            _triggerStack
   * @type            Function
   * @private
   * @async
   *
   * This function take an Array Stack as parameter and execute it to return the result
   *
   * @param         {String}             stack             The stack to execute
   * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
   * @return        {Promise}                             A promise resolved with the stack result
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _triggerStack(stack, initialValue, metas = {}) {
    let currentCallbackReturnedValue = initialValue;

    // // set the promise in the stack result proto
    // if (currentCallbackReturnedValue !== undefined) {
    //   currentCallbackReturnedValue.__proto__.promise = this;
    // }

    if (!this._stacks || Object.keys(this._stacks).length === 0)
      return currentCallbackReturnedValue;

    // make sure the stack exist
    if (!this._stacks[stack]) {
      this._registerNewStacks(stack);
    }

    let stackArray = [];
    let stackObj = this._stacks[stack];

    if (stackObj && stackObj.callStack) {
      stackArray = [...stackArray, ...stackObj.callStack];
    }

    // check if the stack is a glob pattern
    Object.keys(this._stacks).forEach((stackName) => {
      if (stackName === stack) return;
      if (
        __minimatch(stack, stackName) &&
        this._stacks[stackName] !== undefined
      ) {
        // the glob pattern match the triggered stack so add it to the stack array
        stackArray = [...stackArray, ...this._stacks[stackName].callStack];
      }
    });

    // handle buffers
    if (stackArray.length === 0) {
      for (let i = 0; i < this._settings.bufferedStacks.length; i++) {
        const bufferedStack = this._settings.bufferedStacks[i];
        if (__minimatch(stack, bufferedStack)) {
          this._buffer.push({
            stack,
            value: initialValue
          });
        }
      }
      return initialValue;
    }

    // filter the catchStack
    stackArray.map((item) => item.called++);
    stackArray = stackArray.filter((item) => {
      if (item.callNumber === -1) return true;
      if (item.called <= item.callNumber) return true;
      return false;
    });

    const metasObj = __deepMerge(
      {
        stack,
        originalStack: stack,
        id: this._settings.id,
        state: this._promiseState,
        time: Date.now(),
        level: 1
      },
      metas
    );

    for (let i = 0; i < stackArray.length; i++) {
      // get the actual item in the array
      const item = stackArray[i];
      // make sure the stack exist
      if (!item.callback) return currentCallbackReturnedValue;
      // call the callback function
      let callbackResult = item.callback(
        currentCallbackReturnedValue,
        metasObj
      );
      // check if the callback result is a promise
      if (callbackResult && !callbackResult.restorePromiseBehavior) {
        callbackResult = await callbackResult;
      }

      if (callbackResult !== undefined) {
        // if the settings tells that we have to pass each returned value to the next callback
        currentCallbackReturnedValue = callbackResult;
      }
    }

    return currentCallbackReturnedValue;
  }

  /**
   * @name          _triggerStacks
   * @type          Function
   * @private
   * @async
   *
   * This function take as parameters a list of stacks to trigger like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
   * the initial value to pass to the first callback of the joined stacks...
   *
   * @param         {Array|String}            stacks          The stacks to trigger
   * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
   * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _triggerStacks(stacks, initialValue, metas = {}) {
    return new Promise(async (resolve, reject) => {
      // await __wait(0);

      if (!stacks) return this;

      // check if the stacks is "*"
      if (typeof stacks === 'string')
        stacks = stacks.split(',').map((s) => s.trim());

      let currentStackResult = initialValue;

      for (let i = 0; i < stacks.length; i++) {
        let stackResult = await this._triggerStack(
          stacks[i],
          currentStackResult,
          metas
        );
        if (stackResult !== undefined) {
          currentStackResult = stackResult;
        }
      }

      resolve(currentStackResult);
    });
  }

  /**
   * @name                on
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).on('resolve', value => {
   *    // do something with the value that is "hello world"
   * }).on('catch:1', error => {
   *    // do something that will be called only once
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  on(stacks, callback) {
    if (this._isDestroyed) {
      throw new Error(
        `Sorry but you can't call the "on" method on this SPromise cause it has been destroyed...`
      );
    }

    if (typeof stacks === 'string')
      stacks = stacks.split(',').map((s) => s.trim());

    // loop on each stacks
    stacks.forEach((name) => {
      // check if it has a callNumber specified using name:1
      const splitedName = name.split(':');
      let callNumber = undefined;
      if (splitedName.length === 2) {
        name = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      // calling the registration method
      this._registerCallbackInStack(name, callback, {
        callNumber
      });
    });

    // maintain chainability
    return this;
  }

  /**
   * @name            off
   * @type            Function
   *
   * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
   * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
   *
   * @param       {String}        name        The event name to unsubscribe to
   * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
   * @return      {SPromise}                The SPromise instance to maintain chainability
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  off(name, callback = null) {
    if (!callback) {
      delete this._stacks[name];
      return this;
    }

    // get the stack
    let stackObj = this._stacks[name];
    if (!stackObj) return this;
    // loop on the stack registered callback to finc the one to delete
    stackObj.callStack = stackObj.callStack.filter((item) => {
      if (item.callback === callback) return false;
      return true;
    });
    // make sure we have saved the new stack
    this._stacks[name] = stackObj;
    // maintain chainability
    return this;
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
    // super.finally(...args);
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
    delete this._stacks;

    delete this._resolvers;
    delete this._settings;
    this._isDestroyed = true;
  }
};
