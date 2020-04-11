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
export default class SPromise {

  /**
   * @name                   _masterPromise
   * @type                    Promise
   * @private
   * 
   * Store the master promise returned by the class constructor
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _masterPromise = null;

  /**
   * @name                   _masterPromiseResolveFn
   * @type                    Promise
   * @private
   * 
   * Store the master promise resolve function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _masterPromiseResolveFn = null;

  /**
   * @name                   _masterPromiseRejectFn
   * @type                    Promise
   * @private
   * 
   * Store the master promise reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _masterPromiseRejectFn = null;

  /**
   * @name                  _executorFn
   * @type                  Function
   * 
   * Store the executor function passed to the constructor
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _executorFn = null;

  /**
   * @name                  _isExecutorStarted
   * @type                  Boolean
   * 
   * Store the status of the executor function. true if it has been executed, false if not...
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _isExecutorStarted = null;

  /**
   * @name                  _thenStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "then" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _thenStack = [];

  /**
   * @name                  _thenOnceStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "thenOnce" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _thenOnceStack = [];

  /**
   * @name                  _catchStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "catch" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _catchStack = [];

  /**
   * @name                  _catchOnceStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "catchOnce" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _catchOnceStack = [];

  /**
   * @name                  _afterStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "after" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _afterStack = [];

  /**
   * @name                  _afterSuccessStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "after" method and that
   * the "release" function has been called with something else that an Error instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _afterSuccessStack = [];

  /**
   * @name                  _afterErrorStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "after" method and that
   * the "release" function has been called with an Error instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _afterErrorStack = [];

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
    // save the executor function
    this._executorFn = executor;
    // init the master promise returned
    this._masterPromise = new Promise(async (resolve, reject) => {
      this._masterPromiseResolveFn = resolve;
      this._masterPromiseRejectFn = reject;
      setTimeout(() => {
        if (!this._isExecutorStarted) {
          this._executorFn(this._resolve.bind(this), this._reject.bind(this), this._release.bind(this));
          this._isExecutorStarted = true;
        }
      });
    });
    // override master promise methods
    this._masterPromise.then = this.then.bind(this);
    this._masterPromise.thenOnce = this.thenOnce.bind(this);
    this._masterPromise.catch = this.catch.bind(this);
    this._masterPromise.catchOnce = this.catchOnce.bind(this);
    this._masterPromise.after = this.after.bind(this);
    this._masterPromise.resolve = this._resolve.bind(this);
    this._masterPromise.reject = this._reject.bind(this);
    this._masterPromise.release = this._release.bind(this);
    this._masterPromise.start = this.start.bind(this);
    // return the master promise
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
    // loop on all the _thenOnceStack registered functions
    this._thenOnceStack = this._thenOnceStack.filter(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
      // return null to remove the element from the stack
      return false;
    });
    // loop on all the _thenStack registered functions
    this._thenStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
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
    // loop on all the _catchOnceStack registered functions
    this._catchOnceStack = this._catchOnceStack.filter(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
      // return false to remove the element from the stack
      return false;
    });
    // loop on all the _catchStack registered functions
    this._catchStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.apply(this, [...args, this]);
    });
  }

  /**
   * @name          _release
   * @type          Function
   * @private
   * 
   * This is the method that will be called by the promise executor passed release function
   * 
   * @param       {Mixed}         ...args           The arguments that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _release(...args) {

    // loop on all the _afterStack registered functions
    this._afterStack.forEach(fn => {
      // calling the function with the args passed to the release function
      fn.apply(this, [...args, this]);
    });

    // if the first argument passed to the release function is an error, we assume
    // that the masterPromise has to be rejected
    if (args[0] instanceof Error) {

      // loop on all the _afterErrorStack registered functions
      this._afterErrorStack.forEach(fn => {
        // calling the function with the args passed to the release function
        fn.apply(this, [...args, this]);
      });

      this._masterPromiseRejectFn.apply(this, [...args, this]);
    } else {

      // loop on all the _afterSuccessStack registered functions
      this._afterSuccessStack.forEach(fn => {
        // calling the function with the args passed to the release function
        fn.apply(this, [...args, this]);
      });

      // resolve the master promise
      this._masterPromiseResolveFn.apply(this, [...args, this]);
    }

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
   * @example         js
   * new SPromise((resolve, reject) => {
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
    if (typeof callback === 'function' && this._thenStack.indexOf(callback) === -1) this._thenStack.push(callback);
    // maintain chainability
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
   * @example         js
   * new SPromise((resolve, reject) => {
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
    if (typeof callback === 'function' && this._thenOnceStack.indexOf(callback) === -1) this._thenOnceStack.push(callback);
    // maintain chainability
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
   * @example         js
   * new SPromise((resolve, reject) => {
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
    if (typeof callback === 'function' && this._catchStack.indexOf(callback) === -1) this._catchStack.push(callback);
    // maintain chainability
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
   * @example         js
   * new SPromise((resolve, reject) => {
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
    if (typeof callback === 'function' && this._catchOnceStack.indexOf(callback) === -1) this._catchOnceStack.push(callback);
    // maintain chainability
    return this._masterPromise;
  }

  /**
   * @name                after
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called once when the "release" function has been called
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @example         js
   * new SPromise((resolve, reject, release) => {
   *    // do something...
   *    release('hello world');
   * }).after(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  after(callback) {
    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function' && this._afterStack.indexOf(callback) === -1) this._afterStack.push(callback);
    // maintain chainability
    return this._masterPromise;
  }

  /**
   * @name                afterSuccess
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called once when the "release" function has been called with something else that an Error instance
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @example         js
   * new SPromise((resolve, reject, release) => {
   *    // do something...
   *    release('hello world');
   * }).afterSuccess(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  afterSuccess(callback) {
    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function' && this._afterSuccessStack.indexOf(callback) === -1) this._afterSuccessStack.push(callback);
    // maintain chainability
    return this._masterPromise;
  }

  /**
   * @name                afterError
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called once when the "release" function has been called with an Error instance
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @example         js
   * new SPromise((resolve, reject, release) => {
   *    // do something...
   *    release('hello world');
   * }).afterError(value => {
   *    // do something with the value that is "hello world"
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  afterError(callback) {
    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function' && this._afterErrorStack.indexOf(callback) === -1) this._afterErrorStack.push(callback);
    // maintain chainability
    return this._masterPromise;
  }

  start() {
    if (this._isExecutorStarted) return;
    this._executorFn(this._resolve.bind(this), this._reject.bind(this), this._release.bind(this));
    this._isExecutorStarted = true;
    // maintain chainability
    return this._masterPromise;
  }

}