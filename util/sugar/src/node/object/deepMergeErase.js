/**
 * @name                              deepMergeErase
 * @namespace                         sugar.node.object
 * @type                              Function
 * 
 * This function allows you to tell the deepMerge one to use ONLY the passed value as final value and to not merge it as normal...
 * This seemd maybe a little bit weird but it will be more understandable in the example bellow...
 * 
 * @param                 {Object}            obj             The object to keep as final value. It will erase the object of the other object
 * @return                {Object}                            Return the object with the indication that it need to erase the other ones...
 * 
 * @example               js
 * const deepMerge = '@coffeekraken/sugar/node/object/deepMerge';
 * const deepMergeErase = '@coffeekraken/sugar/node/object/deepMergeErase';
 * const obj1 = {
 *    value: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * };
 * const obj2 = {
 *    value: deepMergeErase({
 *      yop: 'cool value'
 *    })
 * };
 * deepMerge(obj1, obj2);
 * {
 *    value: {
 *      yop: 'cool value'
 *    }
 * }
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function deepMergeErase(obj) {
  // set the flag to erase the other objects
  obj._deepMergeEraseKeys = Object.keys(obj);
  return obj;
}