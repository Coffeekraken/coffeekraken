"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
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
function get(object, path, resolveDots = true, insidePath = null) {
    if (typeof insidePath !== 'string')
        insidePath = null;
    let res;
    if (resolveDots) {
        res = (0, object_1.__get)(object, path);
    }
    else {
        res = object[path];
    }
    if (insidePath) {
        return (0, object_1.__get)(res, insidePath);
    }
    return res;
}
exports.default = get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQXdCLEdBQUcsQ0FDdkIsTUFBTSxFQUNOLElBQUksRUFDSixXQUFXLEdBQUcsSUFBSSxFQUNsQixVQUFVLEdBQUcsSUFBSTtJQUVqQixJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBRXRELElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBSSxXQUFXLEVBQUU7UUFDYixHQUFHLEdBQUcsSUFBQSxjQUFLLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDSCxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsSUFBSSxVQUFVLEVBQUU7UUFDWixPQUFPLElBQUEsY0FBSyxFQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQWxCRCxzQkFrQkMifQ==