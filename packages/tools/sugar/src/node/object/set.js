"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("./get"));
const unquote_1 = __importDefault(require("../string/unquote"));
module.exports = (obj, path, value, settings = {}) => {
    settings = Object.assign({}, settings);
    if (!path || path === '' || path === '.') {
        obj = value;
        return;
    }
    path = path.replace(/\[(\w+)\]/g, '.[$1]');
    // path = path.replace(/^\./, '');
    const a = unquote_1.default(path)
        .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
        .map((p) => unquote_1.default(p));
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
    return get_1.default(obj, path);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLGdEQUEwQjtBQUMxQixnRUFBMEM7QUEwQjFDLGlCQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzNDLFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUN4QyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osT0FBTztLQUNSO0lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLGtDQUFrQztJQUNsQyxNQUFNLENBQUMsR0FBRyxpQkFBUyxDQUFDLElBQUksQ0FBQztTQUN0QixLQUFLLENBQUMsOEJBQThCLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ1osT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztnQkFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQjtRQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDZjtTQUFNO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNqQjtJQUNELE9BQU8sYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMifQ==