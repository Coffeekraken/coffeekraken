/**
 * @name                                    methodExists
 * @namespace                               sugar.js.class
 * @type                                    Function
 * 
 * Check if one or more methods exists on a class instance
 * 
 * @param           {Object}              instance                The instance to check the methods on
 * @param           {String}              ...methods              The methods to check
 * @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
 * 
 * @example           js
 * class Coco {
 *    hello() {}
 * }
 * import methodExists from '@coffeekraken/sugar/node/class/methodExists';
 * const myInstance = new Coco();
 * methodExists(myInstance, 'hello', 'world'); // => ['world'];
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function methodExists(instance, ...methods) {
  const missingMethodsArray = [];
  if (!Array.isArray(methods)) methods = [methods];
  methods.forEach(method => {
    if (typeof instance[method] !== 'function') missingMethodsArray.push(method);
  });
  return !missingMethodsArray.length ? true : missingMethodsArray;
}