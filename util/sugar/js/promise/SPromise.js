"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  SPromise
 * @namespace             sugar.js.promise
 * @type                  Class
 * 
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 * - Pass the normal "resolve" and "reject" function to the passed executor, and pass another one called "release".
 * - Expose the normal "then" and "catch" method to register callbacks
 * - Expose a new "after" method that is used to register callbacks that will be executed after that the Promise has been released using the "release" function
 * - Expose two new methods called "afterSuccess" and "afterError" that are called the same as the "after" one but depending on the passed "release" argument.
 *    - "afterSuccess" will be called everytime the "release" function is called with an argument that is NOT an Error instance
 *    - "afterError" will be called everytime the "release" function is called with an argument that IS an Error instance
 * - Expose two new methods "thenOnce" and "catchOnce" that will be executed the same as the "then" and "catch" callbacks, but just once.
 * - You can call multiple times the "resolve" and "reject" function. This will execute all the callbacks registered through the "then" and "catch" methods.
 * - Calling the "resolve" or "reject" function will not resolve the master promise returned by the constructor.
 * - You can have something like this "await new SPromise((resolve, reject, release) => { ... });" that will executes all your registered callbacks as normal but that will not pass to next statements (cause of the await) until you call the "release" function.
 * - Each "then", "catch", etc... callbacks have their context binded to the actual SPromise instance to you can call all the exposed methods like "resolve", "reject", "release", etc... using "this.resolve('something')" for example...
 * - If you're using arrow functions, you can have access to the SPromise instance through the last callback argument...
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - Something like this can be used
 *    ```js
 *     const myPromise = new SPromise((resolve, reject, release) => {
 *        // do something...
 *     }).then(value => {
 *        // do something...
 *     }).start();
 *    ```
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * 
 * 
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, release) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something');
 * 
 *            // release the Promise. This will actually call the "resolve" function
 *            // on the master promise and so let the code execution continue his way when using some "await" statements
 *            release('finished the execution of my promise...');
 * 
 *            // if you want to "reject" the master promise, just pass an instance of the Error class
 *            // to the "release" function like so:
 *            release(new Error('something bad happened...'));
 * 
 *        }, 1000);
 *    }).start();
 * }
 * 
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).thenOnce(value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * }).start();
 * 
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SPromise {
  /**
   * @name                   _masterPromise
   * @type                    Promise
   * @private
   * 
   * Store the master promise returned by the class constructor
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                   _masterPromiseResolveFn
   * @type                    Promise
   * @private
   * 
   * Store the master promise resolve function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                   _masterPromiseRejectFn
   * @type                    Promise
   * @private
   * 
   * Store the master promise reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _executorFn
   * @type                  Function
   * 
   * Store the executor function passed to the constructor
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _isExecutorStarted
   * @type                  Boolean
   * 
   * Store the status of the executor function. true if it has been executed, false if not...
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _thenStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "then" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _thenOnceStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "thenOnce" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _catchStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "catch" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _catchOnceStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "catchOnce" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _finallyStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "finally" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _resolvedStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "resolved" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _rejectedStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "rejected" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  _cancelStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "cancel" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                  constructor
   * @type                  Function
   * 
   * Constructor
   * 
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * 
   * @example       js
   * const promise = new SPromise((resolve, reject, release) => {
   *    // do something...
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(executor) {
    _defineProperty(this, "_masterPromise", null);

    _defineProperty(this, "_masterPromiseResolveFn", null);

    _defineProperty(this, "_masterPromiseRejectFn", null);

    _defineProperty(this, "_executorFn", null);

    _defineProperty(this, "_isExecutorStarted", null);

    _defineProperty(this, "_thenStack", []);

    _defineProperty(this, "_thenOnceStack", []);

    _defineProperty(this, "_catchStack", []);

    _defineProperty(this, "_catchOnceStack", []);

    _defineProperty(this, "_finallyStack", []);

    _defineProperty(this, "_resolvedStack", []);

    _defineProperty(this, "_rejectedStack", []);

    _defineProperty(this, "_cancelStack", []);

    // save the executor function
    this._executorFn = executor; // init the master promise returned

    this._masterPromise = new Promise(async (resolve, reject) => {
      this._masterPromiseResolveFn = resolve;
      this._masterPromiseRejectFn = reject;
      setTimeout(() => {
        if (!this._isExecutorStarted) {
          this._executorFn(this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this));

          this._isExecutorStarted = true;
        }
      });
    }); // override master promise methods

    this._masterPromise.then = this.then.bind(this);
    this._masterPromise.thenOnce = this.thenOnce.bind(this);
    this._masterPromise.catch = this.catch.bind(this);
    this._masterPromise.catchOnce = this.catchOnce.bind(this);
    this._masterPromise.finally = this.finally.bind(this);
    this._masterPromise.resolved = this.resolved.bind(this);
    this._masterPromise.rejected = this.rejected.bind(this); // this._masterPromise.on = this.on.bind(this);

    this._masterPromise.resolve = this._resolve.bind(this);
    this._masterPromise.reject = this._reject.bind(this);
    this._masterPromise.trigger = this.trigger.bind(this);
    this._masterPromise.cancel = this.cancel.bind(this);
    this._masterPromise.start = this.start.bind(this); // return the master promise

    return this._masterPromise;
  }
  /**
   * @name          _resolve
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed resolve function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the resolve function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _resolve(...args) {
    // trigger resolve
    this._triggerThen(...args); // trigger resolved


    this._triggerResolved(...args); // trigger the finally stack


    this._triggerFinally(...args); // resolve the master promise


    this._masterPromiseResolveFn.apply(this, [...args, this]);
  }
  /**
   * @name          _reject
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed reject function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _reject(...args) {
    // trigger reject
    this._triggerCatch(...args); // trigger rejected


    this._triggerRejected(...args); // trigger the finally stack


    this._triggerFinally(...args); // reject the master promise


    this._masterPromiseRejectFn.apply(this, [...args, this]);
  }
  /**
   * @name          trigger
   * @type          Function
   * 
   * This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself
   * 
   * @param         {String}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel"
   * @param         {Mixed}         ...args         The arguments you want to pass to the callback
   * @return        {SPromise}                      The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    trigger('then', 'hello world');
   *    setTimeout(() => {
   *      resolve('something');
   *    }, 2000);
   * }).then(value => {
   *    // do something with one time "hello world", and one time "something"...
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  trigger(what, ...args) {
    const callbackMethodName = (0, _upperFirst.default)(what);
    if (!this[`_trigger[${callbackMethodName}]`]) return this;
    this[`_trigger${callbackMethodName}`].apply(this, [...args, this]);
    return this;
  }
  /**
   * @name          _triggerThen
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed release function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerThen(...args) {
    // loop on all the _thenOnceStack registered functions
    this._thenOnceStack = this._thenOnceStack.filter(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]); // return null to remove the element from the stack

      return false;
    }); // loop on all the _thenStack registered functions

    this._thenStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name          _triggerCatch
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed revoke function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerCatch(...args) {
    // loop on all the _catchOnceStack registered functions
    this._catchOnceStack = this._catchOnceStack.filter(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]); // return false to remove the element from the stack

      return false;
    }); // loop on all the _catchStack registered functions

    this._catchStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name          _triggerFinally
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed resolve function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerFinally(...args) {
    // loop on all the _finallyStack registered functions
    this._finallyStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name          _triggerResolved
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed resolve function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerResolved(...args) {
    // loop on all the _resolvedStack registered functions
    this._resolvedStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name          _triggerRejected
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed reject function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerRejected(...args) {
    // loop on all the _rejectedStack registered functions
    this._rejectedStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name          _triggerCancel
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed reject function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _triggerCancel(...args) {
    // loop on all the _cancelStack registered functions
    this._cancelStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }
  /**
   * @name                on
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).on(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  on(...args) {
    // get the callback that is the last argument
    const callback = args[args.length - 1]; // get all the actions names like "then", "catch", etc...

    const actionNames = args.filter(a => typeof a === 'string');
    console.log(callback, actionNames); // make sure the last argument is a callback function

    if (typeof callback !== 'function' || actionNames.length <= 0) return this._masterPromise; // loop on each action names

    actionNames.forEach(name => {
      // make sure this action name is available on the promise object
      if (!this[name]) return; // calling the registration method

      this[name](callback);
    }); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                then
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).then(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  then(callback) {
    // make sure this is a function and register it to the _thenStack
    if (typeof callback === 'function' && this._thenStack.indexOf(callback) === -1) this._thenStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                thenOnce
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    resolve('hello world');
   * }).thenOnce(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  thenOnce(callback) {
    // make sure this is a function and register it to the _thenOnceStack
    if (typeof callback === 'function' && this._thenOnceStack.indexOf(callback) === -1) this._thenOnceStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                catch
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    reject('hello world');
   * }).catch(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  catch(callback) {
    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function' && this._catchStack.indexOf(callback) === -1) this._catchStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                catchOnce
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    reject('hello world');
   * }).catchOnce(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  catchOnce(callback) {
    // make sure this is a function and register it to the _catchOnceStack
    if (typeof callback === 'function' && this._catchOnceStack.indexOf(callback) === -1) this._catchOnceStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                finally
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
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


  finally(callback) {
    // make sure this is a function and register it to the _finallyStack
    if (typeof callback === 'function' && this._finallyStack.indexOf(callback) === -1) this._finallyStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                resolved
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
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


  resolved(callback) {
    // make sure this is a function and register it to the _resolvedStack
    if (typeof callback === 'function' && this._resolvedStack.indexOf(callback) === -1) this._resolvedStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                rejected
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
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


  rejected(callback) {
    // make sure this is a function and register it to the _rejectedStack
    if (typeof callback === 'function' && this._rejectedStack.indexOf(callback) === -1) this._rejectedStack.push(callback); // maintain chainability

    return this._masterPromise;
  }
  /**
   * @name                cancel
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something...
   *    revoke('hello world');
   * }).cancel(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  cancel(...args) {
    // if we have passed a function as argument, take that as a callback registration
    if (typeof args[0] === 'function') {
      const callback = args[0]; // make sure this is a function and register it to the _catchStack

      if (typeof callback === 'function' && this._cancelStack.indexOf(callback) === -1) this._cancelStack.push(callback); // maintain chainability

      return this._masterPromise;
    } else {
      // otherwise, trigger the "cancel" callback
      this._triggerCancel(...args); // reject the master promise with "null" as parameter


      this._masterPromiseRejectFn(null); // destroy the promise


      return this._destroy();
    }
  }
  /**
   * @name                    start
   * @type                    Function
   * 
   * This method is useful when you want the executor function passed to the constructor to be called directly and not
   * as usual during the next javascript execution loop.
   * 
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger) => {
   *    // do something
   * }).then(value => {
   *    // do something
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  start() {
    if (this._isExecutorStarted) return;

    this._executorFn(this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this));

    this._isExecutorStarted = true; // maintain chainability

    return this._masterPromise;
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
    // destroying all the callbacks stacks registered
    this._rejectedStack.length = 0;
    delete this._rejectedStack;
    this._resolvedStack.length = 0;
    delete this._resolvedStack;
    this._thenOnceStack.length = 0;
    delete this._thenOnceStack;
    this._thenStack.length = 0;
    delete this._thenStack;
    this._cancelStack.length = 0;
    delete this._cancelStack;
    this._catchOnceStack.length = 0;
    delete this._catchOnceStack;
    this._catchStack.length = 0;
    delete this._catchStack;
    this._finallyStack.length = 0;
    delete this._finallyStack;
    delete this._isExecutorStarted;
    delete this._executorFn;
    delete this._masterPromiseResolveFn;
    delete this._masterPromiseRejectFn;
    delete this._masterPromise; // return null

    return null;
  }

}

exports.default = SPromise;
module.exports = exports.default;