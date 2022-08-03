// @ts-nocheck
/**
 * @name        toQueryString
 * @namespace            shared.object
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Transform an object (key => pairs) to a query string like "?var1=value1&var2"
 *
 * @param 		{Object} 		obj 		The object to serialize
 * @return 		{String} 					The query string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import toQueryString from '@coffeekraken/sugar/js/object/toQueryString'
 * console.log(toQueryString({
 * 	value1 : 'coco',
 * 	value1 : 'plop'
 * }));
 * // => ?value1=coco&value2=plop
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function toQueryString(obj) {
    return ('?' +
        Object.keys(obj)
            .reduce(function (a, k) {
            a.push(k + '=' + encodeURIComponent(obj[k]));
            return a;
        }, [])
            .join('&'));
}
export default toQueryString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRztJQUN0QixPQUFPLENBQ0gsR0FBRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNqQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsYUFBYSxDQUFDIn0=