// @ts-nocheck
import __unquote from '../string/unquote';
import __unique from '@coffeekraken/sugar/shared/array/unique';
/**
 * @name                          get
 * @namespace            js.object
 * @type                          Function
 * @platform          js
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const a = path
        .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
        .map((p) => __unquote(p));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pDLFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxHQUFHO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUvQixJQUFJLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxjQUFjLENBQUMsSUFBSSxDQUNmLENBQUMsR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDakUsQ0FBQztTQUNMO0tBQ0o7SUFFRCxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEtBQUssU0FBUztZQUFFLE9BQU8sTUFBTSxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkMsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNyRCxNQUFNLENBQUMsR0FBRyxJQUFJO1NBQ1QsS0FBSyxDQUFDLDhCQUE4QixDQUFDO1NBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRVosT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRCxlQUFlLEdBQUcsQ0FBQyJ9