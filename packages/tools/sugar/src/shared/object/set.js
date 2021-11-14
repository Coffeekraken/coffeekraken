// @ts-nocheck
import __get from './get';
import __unquote from '../string/unquote';
/**
 * @name                                        set
 * @namespace            js.object
 * @type                                        Function
 * @platform          js
 * @platform          node
 * @status        beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9DLFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUN0QyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osT0FBTztLQUNWO0lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLGtDQUFrQztJQUNsQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3BCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztTQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNaLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7Z0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDbEI7UUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pCO1NBQU07UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyJ9