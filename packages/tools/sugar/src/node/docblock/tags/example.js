"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              example
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @status              wip
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
exports.default = example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSTtJQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxJQUFJLEdBQUcsSUFBSTtTQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixPQUFPO1lBQ0wsUUFBUSxFQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO2dCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNoQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ3JDLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNuQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxrQkFBZSxPQUFPLENBQUMifQ==