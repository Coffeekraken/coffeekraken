// @ts-nocheck

import __uniqid from '../string/uniqid';

/**
 * @name                  proxy
 * @namespace           sugar.js.array
 * @type                  Function
 * @status              wip
 *
 * This function override the passed array prototype to intercept changes made through
 *
 * @param         {Array}           array           The array to proxy
 * @return        {Array}                           The same array with his prototype proxied
 *
 * @example       js
 * import proxy from '@coffeekraken/sugar/js/array/proxy';
 * const myArray = proxy([1,2,3]);
 * myArray.watch(['push','pop'], (watchObj) => {
 *    // check the watchObj action
 *    switch (watchObj.action) {
 *      case 'push':
 *        // do something...
 *      break;
 *    }
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function proxy(array) {
  if (array.__$proxied) return array;

  const watchStack = {};

  // mark that this array has already been proxied
  Object.defineProperty(array, '__$proxied', {
    value: true,
    enumerable: false,
    writable: false
  });

  function _proxyMethod(name, ...args) {
    const handlersStack = [];
    Object.keys(watchStack).forEach((watchId) => {
      const watch = watchStack[watchId];
      if (watch.methods.indexOf(name) === -1) return;
      handlersStack.push({
        handlerFn: watch.handlerFn,
        watchObj: {
          oldValue: [...array],
          action: `${name}`,
          fullAction: `Array.${name}`,
          args
        }
      });
    });

    const returnValue = Array.prototype[name].call(array, ...args);

    handlersStack.forEach((handlerObj) => {
      handlerObj.watchObj = {
        ...handlerObj.watchObj,
        value: array,
        returnedValue: returnValue
      };
      handlerObj.handlerFn(handlerObj.watchObj);
    });

    return returnValue;
  }

  Object.getOwnPropertyNames(Array.prototype).forEach((methodName) => {
    const unProxyMethods = ['length', 'constructor'];
    if (unProxyMethods.indexOf(methodName) !== -1) return;
    Object.defineProperty(array, methodName, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: (...args) => {
        return _proxyMethod(methodName, ...args);
      }
    });
  });

  /**
   * @name                    watch
   * @type                    Function
   *
   * This method allows you to specify which Array methods you want to watch by passing an array of methods names like ['push','pop'].
   * You can also specify the handler function that will be called on each array updates, etc...
   *
   * @param         {Array|String}          methods               The methods you want to watch
   * @param         {Function}              handler               The function that will be called on each updates. This function will be called with an object as parameters. Here's the list of properties available:
   * - method (null) {String}: The method name that causes the watch emit
   * - args ([]) {Array}: An array of all the arguments passed to the method call
   * - oldValue (null) {Array}: The array just before the method call
   * - value (null) {Array}: The array after the method call
   * - returnedValue (null) {Mixed}: This is the value that the method call has returned
   * @return        {String}                                    Return a uniq watchid that you can use to unwatch this process
   *
   * @example         js
   * const watchId = myProxiedArray.watch(['push', 'pop'], (watchObj) => {
   *    // do something...
   * });
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  Object.defineProperty(array, 'watch', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (methods, handlerFn) => {
      // create a watch id that we send back to the caller
      const watchId = __uniqid();
      // append this watch process
      watchStack[watchId] = {
        methods,
        handlerFn
      };
      // return the watchId to be able to unwatcn this watch process
      return watchId;
    }
  });

  /**
   * @name                  unwatch
   * @type                  Function
   *
   * This methods allows you to unwatch a process started with the "watch" method.
   * You have to pass as parameter the watchId that the "watch" method has returned you.
   *
   * @param       {String}          watchId         The watchId returned by the "watch" method
   *
   * @example       js
   * const watchId = myArray.watch('push', (obj) => //...);
   * myArray.unwatch(watchId);
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  Object.defineProperty(array, 'unwatch', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (watchId) => {
      // delete the watch process
      delete watchStack[watchId];
    }
  });

  // return the processed array
  return array;
}
export default proxy;
