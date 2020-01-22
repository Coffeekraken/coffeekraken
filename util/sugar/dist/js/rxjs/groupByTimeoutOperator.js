"use strict";

var _Observable = require("rxjs/Observable");

/**
 * @name      groupByTimeout
 * @namespace     sugar.js.rxjs
 * @type      Function
 *
 * Group an rxjs observable by timeout
 *
 * @return      {Observable}          An rxjs observable
 *
 * @example       js ^
 * import { Observable } from 'rxjs';
 * require('@coffeekraken/js/util/sugar/rxjs/groupByTimeout');
 * const observable = new Observable(subscriber => {
 *    subscriber.groupByTimeout()
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
_Observable.Observable.prototype.groupByTimeout = function (properties) {
  const observable = new _Observable.Observable(subscriber => {
    const source = this;
    let timeout = null;
    let stack = []; // subscribe to the source

    const subscription = source.subscribe(elm => {
      // add the element to stack
      stack.push(elm); // clear the timeout

      clearTimeout(timeout); // set a new timeout to wait next loop to
      // send the elements into the stream

      timeout = setTimeout(() => {
        // send the stack downward
        subscriber.next(stack); // clean stack

        stack = [];
      });
    }, error => subscriber.error(error), () => subscriber.complete()); // make sure we return the subscription

    return subscription;
  }); // return the observable

  return observable;
};