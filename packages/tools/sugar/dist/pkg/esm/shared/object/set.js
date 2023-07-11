// @ts-nocheck
import __isPlainObject from '../is/isPlainObject.js';
import __unquote from '../string/unquote.js';
import __get from './get.js';
export default function __set(obj, path, value, settings) {
    const finalSettings = Object.assign({ preferAssign: false }, (settings !== null && settings !== void 0 ? settings : {}));
    let o = obj, a;
    if (Array.isArray(path) && path.length === 1) {
        path = path[0];
    }
    if (typeof path === 'string') {
        if (!path || path === '' || path === '.') {
            Object.assign(obj, value);
            return;
        }
        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        a = __unquote(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map((p) => __unquote(p));
    }
    else if (Array.isArray(path)) {
        a = [...path];
    }
    while (a.length - 1) {
        const n = a.shift();
        if (!(n in o)) {
            if (typeof a[0] === 'string') {
                if (a[0].match(/^\[[0-9]+\]$/))
                    o[n] = [];
                else
                    o[n] = {};
            }
            else {
                o[n] = {};
            }
        }
        if (!o[n]) {
            o[n] = {};
        }
        o = o[n];
    }
    if (typeof a[0] === 'string' && a[0].match(/^\[[0-9]+\]$/)) {
        if (!Array.isArray(o)) {
            o = [];
        }
        o.push(value);
    }
    else {
        if (__isPlainObject(o[a[0]]) &&
            __isPlainObject(value) &&
            finalSettings.preferAssign) {
            // empty the current obj
            for (const key in o[a[0]]) {
                delete o[a[0]][key];
            }
            // assigning the new value
            Object.assign(o[a[0]], value);
        }
        else {
            o[a[0]] = value;
        }
    }
    return __get(obj, path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFzQzdCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUN6QixHQUFRLEVBQ1IsSUFBdUIsRUFDdkIsS0FBVSxFQUNWLFFBQXVCO0lBRXZCLE1BQU0sYUFBYSxtQkFDZixZQUFZLEVBQUUsS0FBSyxJQUNoQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUNQLENBQUMsQ0FBQztJQUVOLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUIsT0FBTztTQUNWO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLGtDQUFrQztRQUNsQyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQzthQUNkLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzthQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDakI7SUFFRCxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDWCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztvQkFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2I7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2I7UUFFRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ25CLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDVjtRQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakI7U0FBTTtRQUNILElBQ0ksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxZQUFZLEVBQzVCO1lBQ0Usd0JBQXdCO1lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtZQUNELDBCQUEwQjtZQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNuQjtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUMifQ==