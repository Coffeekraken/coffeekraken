"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function todo(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((todo) => {
        var _a, _b;
        if (!todo.value)
            return;
        const parts = todo.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const priority = (_a = parts[1]) !== null && _a !== void 0 ? _a : 'normal', description = new String((_b = parts[0]) !== null && _b !== void 0 ? _b : '');
        description.render = true;
        res.push({
            priority,
            description,
        });
    });
    return res;
}
exports.default = todo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQTJCZCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVyRSxNQUFNLFFBQVEsR0FBRyxNQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsbUNBQUksUUFBUSxFQUNqQyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxRQUFRO1lBQ1IsV0FBVztTQUNkLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=