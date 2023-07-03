"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function support(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((support) => {
        var _a;
        if (!support.value)
            return;
        const parts = support.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const description = new String((_a = parts[1]) !== null && _a !== void 0 ? _a : '');
        description.render = true;
        res.push({
            name: parts[0],
            description,
        });
    });
    return res;
}
exports.default = support;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQTJCZCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUFFLE9BQU87UUFFM0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNMLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsV0FBVztTQUNkLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=