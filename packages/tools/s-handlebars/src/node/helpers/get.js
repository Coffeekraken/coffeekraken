import __get from '@coffeekraken/sugar/shared/object/get';
/**
 * @name            get
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get get a value deep into the passed object using dotpath syntax
 *
 * @param       {Object}        object          The object you want to get a value from
 * @param      {String}        path             The dotpath to the value you want to get
 * @param       {Boolean}       [resolveDots=true]      Specify if you want to resolve the passed dotpath or treat it as a property
 * @param       {String}        [insidePath=null]       Gives you the ability to take a subvalue if you have set the "resolveDots" to false
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function get(object, path, resolveDots = true, insidePath = null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FDdkIsTUFBTSxFQUNOLElBQUksRUFDSixXQUFXLEdBQUcsSUFBSSxFQUNsQixVQUFVLEdBQUcsSUFBSTtJQUVqQixJQUFJLEdBQUcsQ0FBQztJQUNSLElBQUksV0FBVyxFQUFFO1FBQ2IsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDN0I7U0FBTTtRQUNILEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEI7SUFDRCxJQUFJLFVBQVUsRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyJ9