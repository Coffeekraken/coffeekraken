// @ts-nocheck
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __unquote from '../string/unquote';
/**
 * @name                          get
 * @namespace            shared.object
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
    if (Array.isArray(path)) {
        return __get(obj, path, settings);
    }
    if (obj[path] !== undefined)
        return obj[path];
    if (!path || path === '' || path === '.')
        return obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/\\\./g, '_dot_');
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
    let o = obj, a;
    if (typeof path === 'string') {
        if (obj[path] !== undefined)
            return obj[path];
        if (!path || path === '' || path === '.')
            return obj;
        path = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
    }
    a = [...path].map((p) => {
        if (typeof p === 'string')
            return __unquote(p);
        return p;
    });
    while (a.length) {
        let n = a.shift();
        if (typeof n === 'string') {
            n = n.replace(/\?$/, '');
        }
        if (typeof o !== 'object' || !(n in o)) {
            return;
        }
        o = o[n];
    }
    return o;
}
export default get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pDLFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNyQztJQUVELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUvQixJQUFJLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxjQUFjLENBQUMsSUFBSSxDQUNmLENBQUMsR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDakUsQ0FBQztTQUNMO0tBQ0o7SUFFRCxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEtBQUssU0FBUztZQUFFLE9BQU8sTUFBTSxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkMsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFDUCxDQUFDLENBQUM7SUFFTixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztLQUNyRDtJQUVELENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1lBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLE9BQU87U0FDVjtRQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDWjtJQUVELE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUVELGVBQWUsR0FBRyxDQUFDIn0=