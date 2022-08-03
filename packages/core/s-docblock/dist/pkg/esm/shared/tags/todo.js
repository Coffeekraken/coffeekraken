// @ts-nocheck
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
export default todo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUEyQmQsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFckUsTUFBTSxRQUFRLEdBQUcsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLG1DQUFJLFFBQVEsRUFDakMsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUM3QyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ0wsUUFBUTtZQUNSLFdBQVc7U0FDZCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=