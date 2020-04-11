"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  SPromise
 * @namespace             sugar.js.promise
 * @type                  Class
 * 
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times
 * 
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something');
 *        }, 1000);
 *    });
 * }
 * 
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * });
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
   * @name                  _afterStack
   * @type                  Array
   * @private
   * 
   * This is the array that store all the callbacks registered through the "release" method
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

    _defineProperty(this, "_thenStack", []);

    _defineProperty(this, "_thenOnceStack", []);

    _defineProperty(this, "_catchStack", []);

    _defineProperty(this, "_catchOnceStack", []);

    _defineProperty(this, "_afterStack", []);

    // save the executor function
    this._executorFn = executor;

    const waitFor = ms => new Promise(r => setTimeout(r, ms)); // init the master promise returned


    this._masterPromise = new Promise(async (resolve, reject) => {
      this._masterPromiseResolveFn = resolve;
      this._masterPromiseRejectFn = reject;
      await waitFor(0);

      this._executorFn(this._resolve.bind(this), this._reject.bind(this), this._release.bind(this));
    }); // override master promise methods

    this._masterPromise.then = this.then.bind(this);
    this._masterPromise.thenOnce = this.thenOnce.bind(this);
    this._masterPromise.catch = this.catch.bind(this);
    this._masterPromise.catchOnce = this.catchOnce.bind(this);
    this._masterPromise.after = this.after.bind(this);
    this._masterPromise.resolve = this._resolve.bind(this);
    this._masterPromise.reject = this._reject.bind(this);
    this._masterPromise.release = this._release.bind(this); // return the master promise

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
      fn.apply(this, [...args, this]); // return null to remove the element from the stack

      return false;
    }); // loop on all the _thenStack registered functions

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
      fn.apply(this, [...args, this]); // return false to remove the element from the stack

      return false;
    }); // loop on all the _catchStack registered functions

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
    // if the first argument passed to the release function is an error, we assume
    // that the masterPromise has to be rejected
    if (args[0] instanceof Error) {
      this._masterPromiseRejectFn.apply(this, [...args, this]);

      return;
    } // loop on all the _afterStack registered functions


    this._afterStack.forEach(fn => {
      // calling the function with the args passed to the release function
      fn.apply(this, [...args, this]);
    }); // resolve the master promise


    this._masterPromiseResolveFn.apply(this, [...args, this]);
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
    if (typeof callback === 'function' && this._catchOnceStack.indexOf(callback) === -1) this._catchOnceStack.push(callback); // maintain chainability

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
    if (typeof callback === 'function' && this._afterStack.indexOf(callback) === -1) this._afterStack.push(callback); // maintain chainability

    return this._masterPromise;
  }

}

exports.default = SPromise;
module.exports = exports.default;