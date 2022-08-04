// @ts-nocheck
/**
 * @name          getKeyByValue
 * @namespace            shared.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
export default getKeyByValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUs7SUFDaEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9