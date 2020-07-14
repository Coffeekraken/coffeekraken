/**
 * @name              getMethods
 * @namespace           node.class
 * @type              Function
 *
 * This function take an instance as parameter and return all the methods in array format
 *
 * @param         {Object}        instance        The instance of the object to get the methods names of
 * @return        {Array}                         A simple array of all the methods names
 *
 * @example         js
 * import getMethods from '@coffeekraken/sugar/js/class/getMethods';
 * myClass {
 *  constructor() {}
 *  hello() {}
 *  world() {}
 * }
 * const myInstance = new myClass();
 * getMethods(myInstance); // => ['hello','world']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function getMethods(toCheck) {
  var props = [];
  var obj = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj);
    if (_props.indexOf('__defineGetter__') !== -1) continue;
    props = props.concat(_props);
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter(function (e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
  });
}
