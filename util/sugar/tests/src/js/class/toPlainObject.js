/**
 * @name                          toPlainObject
 * @namespace                     sugar.js.class
 * @type                          Function
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @example             js
 * import toPlainObject from '@coffeekraken/sugar/js/class/toPlainObject';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function toPlainObject(theClass) {
  const originalClass = theClass || {}
  const keys = Object.getOwnPropertyNames(originalClass);
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key]
    return classAsObj
  }, {});
}