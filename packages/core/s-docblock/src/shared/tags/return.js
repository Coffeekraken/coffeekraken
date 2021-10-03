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
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function returnTag(data, blockSettings) {
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
    const description = new String(stringArray[1] ? stringArray[1].trim() : '');
    description.render = true;
    return {
        type,
        description,
    };
}
export default returnTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNsQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUUzRCxJQUFJLElBQUksR0FDSixXQUFXLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNmLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3RDtTQUFNO1FBQ0gsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakI7SUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFMUIsT0FBTztRQUNILElBQUk7UUFDSixXQUFXO0tBQ2QsQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9