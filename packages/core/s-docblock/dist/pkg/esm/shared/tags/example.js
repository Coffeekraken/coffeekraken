// @ts-nocheck
/**
 * @name              example
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the example tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @example      {Object}                      The formated object
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function example(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    data = data
        .map((item) => {
        if (item.content && item.content[item.content.length - 1] === '') {
            item.content = item.content.slice(0, -1);
        }
        if (!item.content)
            return null;
        const parts = item.value
            .split(/\s{2,9999}|\t/)
            .map((l) => l.trim());
        const result = {
            language: parts[0],
            title: parts[1],
            description: parts[2],
            code: Array.isArray(item.content)
                ? item.content.join('\n').trim().replace(/\\@/, '@')
                : item.content.replace(/\\@/, '@'),
        };
        if (result.title) {
            result.title = new String(result.title);
            result.title.render = true;
        }
        if (result.description) {
            result.description = new String(result.description);
            result.description.render = true;
        }
        return result;
    })
        .filter((item) => item !== null);
    return data;
}
export default example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsSUFBSSxHQUFHLElBQUk7U0FDTixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7YUFDbkIsS0FBSyxDQUFDLGVBQWUsQ0FBQzthQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFCLE1BQU0sTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ3pDLENBQUM7UUFFRixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=