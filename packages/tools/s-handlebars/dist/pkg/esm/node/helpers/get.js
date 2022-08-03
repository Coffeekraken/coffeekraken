import __get from '@coffeekraken/sugar/shared/object/get';
/**
 * @name            get
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get get a value deep into the passed object using dotpath syntax
 *
 * @param       {Object}        object          The object you want to get a value from
 * @param      {String}        path             The dotpath to the value you want to get
 * @param       {Boolean}       [resolveDots=true]      Specify if you want to resolve the passed dotpath or treat it as a property
 * @param       {String}        [insidePath=null]       Gives you the ability to take a subvalue if you have set the "resolveDots" to false
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function get(object, path, resolveDots = true, insidePath = null) {
    if (typeof insidePath !== 'string')
        insidePath = null;
    let res;
    if (resolveDots) {
        res = __get(object, path);
    }
    else {
        res = object[path];
    }
    if (insidePath) {
        return __get(res, insidePath);
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsR0FBRyxDQUN2QixNQUFNLEVBQ04sSUFBSSxFQUNKLFdBQVcsR0FBRyxJQUFJLEVBQ2xCLFVBQVUsR0FBRyxJQUFJO0lBRWpCLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUTtRQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFFdEQsSUFBSSxHQUFHLENBQUM7SUFDUixJQUFJLFdBQVcsRUFBRTtRQUNiLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDSCxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsSUFBSSxVQUFVLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==