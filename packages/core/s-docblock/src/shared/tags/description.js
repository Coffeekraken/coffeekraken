// @ts-nocheck
/**
 * @name              description
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the description tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function description(data) {
    if (Array.isArray(data))
        data = data[0];
    if (data.content && data.content[data.content.length - 1] === '') {
        data.content = data.content.slice(0, -1);
    }
    if (!data.content)
        return '';
    return data.content
        .map((c) => c.trim())
        .join('\n')
        .trim();
}
export default description;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJO0lBRXZCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDN0IsT0FBTyxJQUFJLENBQUMsT0FBTztTQUNoQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ1YsSUFBSSxFQUFFLENBQUM7QUFDWixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==