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
    let type = stringArray && stringArray[0]
        ? __upperFirst(stringArray[0].replace('{', '').replace('}', ''))
        : null;
    if (type && type.includes('|')) {
        type = type.split('|').map((l) => __upperFirst(l.trim()));
    }
    else {
        type = [type];
    }
    return {
        type,
        description: stringArray[1] ? stringArray[1].trim() : ''
    };
}
export default returnTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7SUFDckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFM0QsSUFBSSxJQUFJLEdBQ0osV0FBVyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDYixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7U0FBTTtRQUNMLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2Y7SUFFRCxPQUFPO1FBQ0wsSUFBSTtRQUNKLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtLQUN6RCxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=