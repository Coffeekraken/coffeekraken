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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function mapToObject(map) {
    const obj = {};
    for (const [k, v] of map)
        obj[k] = v;
    return obj;
}
export default mapToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG9PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBUb09iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBUTtJQUN6QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRztRQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==