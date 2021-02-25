// @ts-nocheck
// @shared
import __get from './get';
import __unquote from '../string/unquote';
/**
 * @name                                        set
 * @namespace           sugar.js.object
 * @type                                        Function
 * @stable
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import set from '@coffeekraken/sugar/js/object/set';
 * set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (obj, path, value, settings = {}) => {
    settings = Object.assign({}, settings);
    if (!path || path === '' || path === '.') {
        obj = value;
        return;
    }
    path = path.replace(/\[(\w+)\]/g, '.[$1]');
    // path = path.replace(/^\./, '');
    const a = __unquote(path)
        .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
        .map((p) => __unquote(p));
    let o = obj;
    while (a.length - 1) {
        const n = a.shift();
        if (!(n in o)) {
            if (a[0].match(/^\[[0-9]+\]$/))
                o[n] = [];
            else
                o[n] = {};
        }
        o = o[n];
    }
    if (a[0].match(/^\[[0-9]+\]$/)) {
        if (!Array.isArray(o))
            o = [];
        o.push(value);
    }
    else {
        o[a[0]] = value;
    }
    return __get(obj, path);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ3hDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixPQUFPO0tBQ1I7SUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0Msa0NBQWtDO0lBQ2xDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdEIsS0FBSyxDQUFDLDhCQUE4QixDQUFDO1NBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ1osT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztnQkFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQjtRQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDZjtTQUFNO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNqQjtJQUNELE9BQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMifQ==