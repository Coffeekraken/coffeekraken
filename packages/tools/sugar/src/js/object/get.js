"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unquote_1 = __importDefault(require("../string/unquote"));
/**
 * @name                          get
 * @namespace           sugar.js.object
 * @type                          Function
 * @stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function get(obj, path, settings = {}) {
    settings = Object.assign({}, settings);
    if (obj[path] !== undefined)
        return obj[path];
    if (!path || path === '' || path === '.')
        return obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote_1.default(p));
    let o = obj;
    while (a.length) {
        const n = a.shift();
        if (typeof o !== 'object')
            return;
        if (!(n in o))
            return;
        o = o[n];
    }
    return o;
}
module.exports = get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkMsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDWixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1lBQUUsT0FBTztRQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1Y7SUFDRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFtQkQsaUJBQVMsR0FBRyxDQUFDIn0=