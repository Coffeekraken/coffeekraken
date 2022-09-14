import { __get } from '@coffeekraken/sugar/object';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FDdkIsTUFBTSxFQUNOLElBQUksRUFDSixXQUFXLEdBQUcsSUFBSSxFQUNsQixVQUFVLEdBQUcsSUFBSTtJQUVqQixJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBRXRELElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBSSxXQUFXLEVBQUU7UUFDYixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0gsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QjtJQUNELElBQUksVUFBVSxFQUFFO1FBQ1osT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=