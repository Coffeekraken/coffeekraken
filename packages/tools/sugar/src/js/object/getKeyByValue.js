// @ts-nocheck
// @shared
/**
 * @name          getKeyByValue
 * @namespace           sugar.js.object
 * @type          Function
 * @stable
 *
 * Return the key that correspond to the passed value in the passed object
 *
 * @param         {Object}        object        The object in which to search for the value
 * @param         {Mixed}         value         The value to find in the object
 * @return        {String}                      The key of the wanted value or false if not found
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import getKeyByValue from '@coffeekraken/sugar/js/object/getKeyByValue';
 * console.log(getKeyByValue({ hello: 'world' }, 'world')); // => hello
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
export default getKeyByValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0S2V5QnlWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEtleUJ5VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLO0lBQ2xDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==