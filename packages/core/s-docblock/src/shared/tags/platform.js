// @ts-nocheck
function param(data) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((param) => {
        var _a;
        if (!param.value)
            return;
        const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
        res.push({
            name: parts[0],
            description: (_a = parts[1]) !== null && _a !== void 0 ? _a : ''
        });
    });
    return res;
}
export default param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBNEJkLFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztRQUVyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRXpCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFcEUsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNQLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsV0FBVyxFQUFFLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==