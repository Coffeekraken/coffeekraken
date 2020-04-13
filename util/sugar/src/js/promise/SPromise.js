import __upperFirst from '../string/upperFirst';
import __asyncForEach from '../array/asyncForEach';
import __deepMerge from '../object/deepMerge';

/**
 * @name                  SPromise
 * @namespace             sugar.js.promise
 * @type                  Class
 * 
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 * 
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "cancel" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then:2', value => { ... }).on('then:1,catch', value => { ... }).start();
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger, cancel) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      }).start();
 *      console.log(result); // => helloWorldPromise
 *    ```
 * 
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger, cancel) => {
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
   * @name                  _stacks
   * @type                  Object
   * @private
   * 
   * Store the stacks callbacks
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _stacks = {
    then: [],
    catch: [],
    resolved: [],
    rejected: [],
    finally: [],
    cancel: []
  };

  /**
   * @name                  constructor
   * @type                  Function
   * 
   * Constructor
   * 
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * 
   * @example       js
   * const promise = new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   * }).then(value => {
   *    // do something...
   * }).finally(value => {
   *    // do something...
   * }).start();
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
          this._executorFn(this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this), this._cancel.bind(this));
          this._isExecutorStarted = true;
        }
      });
    });
    // override master promise methods
    this._masterPromise.then = this.then.bind(this);
    this._masterPromise.catch = this.catch.bind(this);
    this._masterPromise.finally = this.finally.bind(this);
    this._masterPromise.resolved = this.resolved.bind(this);
    this._masterPromise.rejected = this.rejected.bind(this);
    this._masterPromise.on = this.on.bind(this);

    this._masterPromise.resolve = this._resolve.bind(this);
    this._masterPromise.reject = this._reject.bind(this);
    this._masterPromise.trigger = this.trigger.bind(this);
    this._masterPromise.cancel = this.cancel.bind(this);

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
   * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
   * @param       {Array|String}         [stacksOrder='then,resolved,finally']      This specify in which order have to be called the stacks
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _resolve(arg, stacksOrder = 'then,resolved,finally') {
    // exec the wanted stacks
    const stacksResult = await this._triggerStacks(stacksOrder, arg);
    // resolve the master promise
    this._masterPromiseResolveFn.apply(this, [stacksResult, this]);
    // return the stack result
    return stacksResult;
  }

  /**
   * @name          _reject
   * @type          Function
   * @private
   * @async 
   * 
   * This is the method that will be called by the promise executor passed reject function
   * 
   * @param       {Mixed}         arg           The argument that the promise user is sendind through the reject function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _reject(arg, stacksOrder = ['catch', 'rejected', 'finally']) {
    // exec the wanted stacks
    const stacksResult = await this._triggerStacks(stacksOrder, arg);
    // resolve the master promise
    this._masterPromiseRejectFn.apply(this, [stacksResult, this]);
    // return the stack result
    return stacksResult;
  }

  /**
   * @name          trigger
   * @type          Function
   * @async
   * 
   * This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself
   * 
   * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
   * @param         {Mixed}         arg         The argument you want to pass to the callback
   * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
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
  async trigger(what, arg) {
    // triger the passed stacks
    return this._triggerStacks(what, arg);
  }

  /**
   * @name            _registerCallbackInStack
   * @type            Function
   * 
   * This function take as argument a stack array and register into it the passed callback function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerCallbackInStack(stack, ...args) {
    if (typeof stack === 'string') stack = this._stacks[stack];
    // process the args
    let callback = args[0];
    let callNumber = -1;
    if (args.length === 2 && typeof args[0] === 'number') {
      callback = args[1];
      callNumber = args[0];
    }
    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function' && stack.indexOf(callback) === -1) stack.push({
      callback,
      callNumber,
      called: 0
    });
    // maintain chainability
    return this._masterPromise;
  }

  /**
   * @name            _triggerStack
   * @type            Function
   * @private
   * @async
   * 
   * This function take an Array Stack as parameter and execute it to return the result
   * 
   * @param         {Array|String}             stack             The stack to execute. Can be the stack array directly, or just the stack name like "then", "catch", etc.stack.stack.
   * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
   * @return        {Promise}                             A promise resolved with the stack result
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _triggerStack(stack, initialValue) {

    let currentCallbackReturnedValue = initialValue;

    if (typeof stack === 'string') stack = this._stacks[stack];

    // filter the catchStack
    stack.map(item => item.called++);
    stack = stack.filter(item => {
      if (item.callNumber === -1) return true;
      if (item.called <= item.callNumber) return true;
      return false;
    });

    for (let i = 0; i < stack.length; i++) {
      // get the actual item in the array
      const item = stack[i];
      // call the callback function
      let callbackResult = item.callback.apply(this, [currentCallbackReturnedValue, this]);
      // check if the callback result is a promise
      if (Promise.resolve(callbackResult) === callbackResult) {
        callbackResult = await callbackResult;
      }
      // if the settings tells that we have to pass each returned value to the next callback
      if (callbackResult !== undefined) {
        currentCallbackReturnedValue = callbackResult;
      }
    };

    // return the result
    return currentCallbackReturnedValue;

  }

  /**
   * @name          _triggerStacks
   * @type          Function
   * @private
   * @async
   * 
   * This function take as parameters a list of stacks to trigger like an Array ['then','finnaly'], or a string like so "then,finally", and as second parameter,
   * the initial value to pass to the first callback of the joined stacks...
   * 
   * @param         {Array|String}            stacks          The stacks to trigger
   * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
   * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _triggerStacks(stacks, initialValue) {

    // split the stacks order
    if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());

    let currentStackResult = initialValue;
    for (let i = 0; i < stacks.length; i++) {
      const stackResult = await this._triggerStack(stacks[i], currentStackResult);
      if (stackResult !== undefined) {
        currentStackResult = stackResult;
      }
    }

    return currentStackResult;

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
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    resolve('hello world');
   * }).on('then', value => {
   *    // do something with the value that is "hello world"
   * }).on('catch:1', error => {
   *    // do something that will be called only once
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  on(stacks, callback) {

    if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());

    // loop on each stacks
    stacks.forEach(name => {
      // check if it has a callNumber specified using name:1
      const splitedName = name.split(':');
      let callNumber = -1;
      if (splitedName.length === 2) {
        name = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      // make sure this action name is available on the promise object
      if (!this[name]) return;
      // calling the registration method
      this[name](callNumber, callback);
    });

    // maintain chainability
    return this._masterPromise;
  }

  /**
   * @name                then
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    resolve('hello world');
   * }).then(value => {
   *    // do something with the value that is "hello world"
   *    return new Promise((resolve, reject) => {
   *       setTimeout(() => resolve('hola'), 1000);
   *    });
   * }).then(2, value => {
   *    // do something that will be executed only twice
   *    // do something with the value passed "hola"
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  then(...args) {
    return this._registerCallbackInStack('then', ...args);
  }

  /**
   * @name                catch
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    reject('hello world');
   * }).catch(value => {
   *    // do something with the value that is "hello world"
   * }).catch(1, value => {
   *    // do something that will be executed only once
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  catch(...args) {
    return this._registerCallbackInStack('catch', ...args);
  }

  /**
   * @name                finally
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    resolve('hello world');
   * }).finally(value => {
   *    // do something with the value that is "hello world"
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  finally(...args) {
    return this._registerCallbackInStack('finally', ...args);
  }

  /**
   * @name                resolved
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    resolve('hello world');
   * }).resolved(value => {
   *    // do something with the value that is "hello world"
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  resolved(...args) {
    return this._registerCallbackInStack('resolved', ...args);
  }

  /**
   * @name                rejected
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    resolve('hello world');
   * }).rejected(value => {
   *    // do something with the value that is "hello world"
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  rejected(...args) {
    return this._registerCallbackInStack('rejected', ...args);
  }

  /**
   * @name                cancel
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
   * the "this.resolve('something')" statement. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   * 
   * @param           {Function}        callback        The callback function to register
   * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
   * 
   * @example         js
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something...
   *    cancel('hello world');
   * }).cancel(value => {
   *    // do something with the value that is "hello world"
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async cancel(...args) {
    if ((typeof args[0] === 'number' && typeof args[1] === 'function') || (args.length === 1 && typeof args[0] === 'function')) {
      return this._registerCallbackInStack('cancel', ...args);
    } else {
      return this._cancel(...args);
    }
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
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _cancel(...args) {
    // otherwise, trigger the "cancel" callback
    const cancelStackResult = await this._triggerStack('cancel', ...args);
    // reject the master promise with "null" as parameter
    this._masterPromiseResolveFn(cancelStackResult || null);
    // destroy the promise
    this._destroy();
    // return the stack result
    return cancelStackResult;
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
   * new SPromise((resolve, reject, trigger, cancel) => {
   *    // do something
   * }).then(value => {
   *    // do something
   * }).start();
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  start() {
    if (this._isExecutorStarted) return;
    this._executorFn(this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this), this._cancel.bind(this));
    this._isExecutorStarted = true;
    // maintain chainability
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
    delete this._stacks;

    // delete this._isExecutorStarted; // keep it to avoid errors in the "setTimeout" function in the masterPromise executor...
    delete this._executorFn;
    delete this._masterPromiseResolveFn;
    delete this._masterPromiseRejectFn;
    delete this._masterPromise;
  }

}