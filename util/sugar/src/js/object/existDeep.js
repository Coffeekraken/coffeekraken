/**
 * @name                                  existDeep
 * @namespace                             sugar.js.object
 * @type                                  Function
 *
 * Check using a doted string if a deep object value exist. Return the value finded if exist, false if not
 *
 * @param               {String}                    objectPath                      The doted object path to check
 * @return              {Mixed}                                                     Return the finded value or false if not exist
 *
 * @example           js
 * import existDeep from '@coffeekraken/sugar/js/object/existDeep';
 * existDeep('myCoolObject.something.cool'); // => false
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (objectPath) => {
  objectPath = objectPath.split('.')
  let obj= eval(objectPath.shift());
  while(obj && objectPath.length) obj = obj[objectPath.shift()];
  return obj || false;
}
