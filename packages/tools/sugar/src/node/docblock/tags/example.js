"use strict";
// @ts-nocheck
// @shared
/**
 * @name              example
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @wip
 *
 * Parse the example tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @example      {Object}                      The formated object
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function example(data) {
    if (!Array.isArray(data))
        data = [data];
    data = data
        .map((item) => {
        if (item.content && item.content[item.content.length - 1] === '') {
            item.content = item.content.slice(0, -1);
        }
        if (!item.content)
            return null;
        return {
            language: typeof item.value === 'string'
                ? item.value.toLowerCase()
                : item.value,
            code: Array.isArray(item.content)
                ? item.content.join('\n').trim().replace(/\\@/, '@')
                : item.content.replace(/\\@/, '@')
        };
    })
        .filter((item) => item !== null);
    return data;
}
module.exports = example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJO0lBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQUksR0FBRyxJQUFJO1NBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7U0FDckMsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELGlCQUFTLE9BQU8sQ0FBQyJ9