"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              snippet
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the snippet tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @snippet      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function snippet(data, blockSettings) {
    if (data.content && data.content[data.content.length - 1] === '') {
        data.content = data.content.slice(0, -1);
    }
    return {
        language: typeof data.value === 'string'
            ? data.value.toLowerCase()
            : data.value,
        code: Array.isArray(data.content)
            ? data.content.join('\n')
            : data.content,
    };
}
exports.default = snippet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUNELE9BQU87UUFDSCxRQUFRLEVBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNwQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO0tBQ3JCLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=