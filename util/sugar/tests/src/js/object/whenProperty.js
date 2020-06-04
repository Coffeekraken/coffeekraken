import _get from "lodash/get";
import __SPromise from '../promise/SPromise';
import __watch from './watch';
import __uniqid from '../string/uniqid';

/**
 * @name        whenProperty
 * @namespace       sugar.js.object
 * @type      Function
 *
 * Resolve a promise when the wanted property on the passed object exist or pass the check function provided
 *
 * @param 		{Object} 					object 				The object on which to monitor the property
 * @param 		{String} 					property 			The property to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the property. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the property exist on the object (and that it passes the checkFn)
 *
 * @example 	js
 * import whenProperty from '@coffeekraken/sugar/js/object/whenProperty'
 *
 * const myObj = {
 *  	title : 'Hello'
 * };
 *
 * whenProperty(myObj, 'title').then((value) => {
 * 		// the object has a title property now
 * });
 *
 * // with a checkFn
 * whenProperty(myObj, 'title', (newVal, oldVal) => {
 * 		// when the property is 'Hello World'
 * 		return newVal === 'Hello World';
 * }).then((value) => {
 * 		// do something with your Hello World
 * });
 *
 * setTimeout(() => {
 * 		// this will resolve the promise
 * 		myObj.title = 'Hello World';
 * },1000);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function whenProperty(object, property, checkFn = null) {

  let watchedObj, watchId = __uniqid();

  return new __SPromise((resolve, reject, trigger, cancel) => {

    const value = _get(object, property);
    if (value) {
      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    watchedObj = __watch(object, property, (update) => {
      if (update.action === 'Object.set') {
        if (checkFn && checkFn(update.value, update.oldValue)) {
          resolve(update.value);
          object.unwatch(watchId);
        } else if (!checkFn) {
          resolve(update.value);
          object.unwatch(watchId);
        }
      }
    }, watchId);
    watchedObj = object;

  }).on('cancel,finnaly', () => {
    watchedObj && watchedObj.unwatch(watchId);
  }).start();
}
