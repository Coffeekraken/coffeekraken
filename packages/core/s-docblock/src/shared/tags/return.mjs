// @ts-nocheck
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
/**
 * @name              return
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the return tag
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
function returnTag(data) {
    const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
    return {
        type: stringArray[0]
            ? __upperFirst(stringArray[0].replace('{', '').replace('}', '').trim())
            : '',
        description: stringArray[1] ? stringArray[1].trim() : ''
    };
}
export default returnTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWRvY2Jsb2NrL3NyYy9zaGFyZWQvdGFncy9yZXR1cm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxFQUFFO1FBQ04sV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQ3pELENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==