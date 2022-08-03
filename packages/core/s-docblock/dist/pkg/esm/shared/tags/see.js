// @ts-nocheck
/**
 * @name              see
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the see tag
 *
 * @see       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @see      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function see(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((see) => {
        var _a;
        if (!see.value)
            return;
        const parts = see.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const url = parts[0], description = new String((_a = parts[1]) !== null && _a !== void 0 ? _a : '');
        description.render = true;
        res.push({
            url,
            description,
        });
    });
    return res;
}
export default see;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNoQixXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxHQUFHO1lBQ0gsV0FBVztTQUNkLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxHQUFHLENBQUMifQ==