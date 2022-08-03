"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = see;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLE9BQU87UUFDdkIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDLENBQUM7UUFDN0MsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNMLEdBQUc7WUFDSCxXQUFXO1NBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxrQkFBZSxHQUFHLENBQUMifQ==