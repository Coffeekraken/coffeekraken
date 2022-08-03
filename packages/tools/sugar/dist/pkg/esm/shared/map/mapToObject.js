/**
 * @name          mapToObject
 * @namespace            js.map
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take a Map object and convert it to a plain object
 *
 * @param       {Map}         map       The map object to convert into object
 * @return      {Object}                The plain object
 *
 * @example       js
 * import mapToObject from '@coffeekraken/sugar/js/map/mapToObject';
 * const myMap = new Map();
 * myMap.set('hello', 'world');
 * mapToObject(myMap);
 * // {
 * //   hello: 'world'
 * // }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function mapToObject(map) {
    const obj = {};
    for (const [k, v] of map)
        obj[k] = v;
    return obj;
}
export default mapToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFRO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHO1FBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9