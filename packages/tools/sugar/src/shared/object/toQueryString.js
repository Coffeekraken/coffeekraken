// @ts-nocheck
/**
 * @name        toQueryString
 * @namespace            js.object
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9RdWVyeVN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvUXVlcnlTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHO0lBQ3RCLE9BQU8sQ0FDSCxHQUFHO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDWCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==