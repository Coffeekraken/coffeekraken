// @ts-nocheck
/**
 * @name              snippet
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the snippet tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @snippet      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function snippet(data) {
    if (data.content && data.content[data.content.length - 1] === '') {
        data.content = data.content.slice(0, -1);
    }
    return {
        language: typeof data.value === 'string' ? data.value.toLowerCase() : data.value,
        code: Array.isArray(data.content) ? data.content.join('\n') : data.content
    };
}
export default snippet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25pcHBldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1kb2NibG9jay9zcmMvc2hhcmVkL3RhZ3Mvc25pcHBldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJO0lBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsT0FBTztRQUNMLFFBQVEsRUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztRQUN4RSxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztLQUMzRSxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=