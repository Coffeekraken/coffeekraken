"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
const unquote_1 = __importDefault(require("../string/unquote"));
const get_1 = __importDefault(require("./get"));
function __set(obj, path, value, settings) {
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
        a = (0, unquote_1.default)(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map((p) => (0, unquote_1.default)(p));
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
        if (!Array.isArray(o))
            o = [];
        o.push(value);
    }
    else {
        if ((0, isPlainObject_1.default)(o[a[0]]) &&
            (0, isPlainObject_1.default)(value) &&
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
    return (0, get_1.default)(obj, path);
}
exports.default = __set;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQUNsRCxnRUFBMEM7QUFDMUMsZ0RBQTBCO0FBc0MxQixTQUF3QixLQUFLLENBQ3pCLEdBQVEsRUFDUixJQUF1QixFQUN2QixLQUFVLEVBQ1YsUUFBdUI7SUFFdkIsTUFBTSxhQUFhLG1CQUNmLFlBQVksRUFBRSxLQUFLLElBQ2hCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQ1AsQ0FBQyxDQUFDO0lBRU4sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7SUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0NBQWtDO1FBQ2xDLENBQUMsR0FBRyxJQUFBLGlCQUFTLEVBQUMsSUFBSSxDQUFDO2FBQ2QsS0FBSyxDQUFDLDhCQUE4QixDQUFDO2FBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxpQkFBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7U0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNqQjtJQUVELE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNYLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O29CQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDYjtTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDYjtRQUVELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDWjtJQUVELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pCO1NBQU07UUFDSCxJQUNJLElBQUEsdUJBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBQSx1QkFBZSxFQUFDLEtBQUssQ0FBQztZQUN0QixhQUFhLENBQUMsWUFBWSxFQUM1QjtZQUNFLHdCQUF3QjtZQUN4QixLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFDRCwwQkFBMEI7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkI7S0FDSjtJQUNELE9BQU8sSUFBQSxhQUFLLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUF0RUQsd0JBc0VDIn0=