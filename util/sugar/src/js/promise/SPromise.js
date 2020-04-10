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
export default class SPromise {

  /**
   * @name                  _thenStack
   * @type                  Array
   * 
   * This is the array that store all the callbacks registered through the "then" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _thenStack = [];

  /**
   * @name                  _catchStack
   * @type                  Array
   * 
   * This is the array that store all the callbacks registered through the "catch" method
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _catchStack = [];

  /**
   * @name                  constructor
   * @type                  Function
   * 
   * Constructor
   * 
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * 
   * @example       js
   * const promise = new SPromise((resolve, reject) => {
   *    // do something...
   * });
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(executor) {
    // calling the executor directly and passing it the resolve and reject functions
    executor(this._resolve, this._reject);
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
    // loop on all the _thenStack registered functions
    this._thenStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.call(this, ...args);
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
    // loop on all the _catchStack registered functions
    this._catchStack.forEach(fn => {
      // calling the function with the args passed to the resolve function
      fn.call(this, ...args);
    });
  }

  /**
   * @name                then
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
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
  }

  /**
   * @name                catch
   * @type                Function
   * 
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
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
  }

}