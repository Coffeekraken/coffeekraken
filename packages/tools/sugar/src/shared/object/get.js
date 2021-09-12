// @ts-nocheck
import __unquote from '../string/unquote';
import __unique from '@coffeekraken/sugar/shared/array/unique';
/**
 * @name                          get
 * @namespace            js.object
 * @type                          Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @feature       Support optional property in the doted path like "something.cool?.hello.world"
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
    let potentialPaths = [path.replace(/\?/gm, '')];
    const parts = path.split('.');
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (part.match(/\?$/)) {
            const before = parts.slice(0, i);
            const after = parts.slice(i + 1);
            potentialPaths.push([...before, ...after].join('.'));
            potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join('.'));
        }
    }
    potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, '')));
    for (let i = 0; i < potentialPaths.length; i++) {
        const path = potentialPaths[i];
        const result = __get(obj, path, settings);
        if (result !== undefined)
            return result;
    }
}
function __get(obj, path, settings = {}) {
    settings = Object.assign({}, settings);
    if (obj[path] !== undefined)
        return obj[path];
    if (!path || path === '' || path === '.')
        return obj;
    const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
    let o = obj;
    while (a.length) {
        const n = a.shift().replace(/\?$/, '');
        if (typeof o !== 'object' || !(n in o)) {
            return;
        }
        o = o[n];
    }
    return o;
}
export default get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqQyxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRztRQUFFLE9BQU8sR0FBRyxDQUFDO0lBQ3JELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFL0IsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2RjtLQUNKO0lBRUQsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxPQUFPLE1BQU0sQ0FBQztLQUMzQztBQUNMLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ25DLFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxHQUFHO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDckQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRVosT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRCxlQUFlLEdBQUcsQ0FBQyJ9