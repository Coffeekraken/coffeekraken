"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              description
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the description tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function description(data, blockSettings) {
    if (Array.isArray(data))
        data = data[0];
    if (data.content && data.content[data.content.length - 1] === '') {
        data.content = data.content.slice(0, -1);
    }
    if (!data.content)
        return '';
    const description = new String(data.content
        .map((c) => c.trim())
        .join('\n')
        .trim());
    description.render = true;
    return description;
}
exports.default = description;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzdCLE1BQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUMxQixJQUFJLENBQUMsT0FBTztTQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVixJQUFJLEVBQUUsQ0FDZCxDQUFDO0lBQ0YsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDMUIsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9