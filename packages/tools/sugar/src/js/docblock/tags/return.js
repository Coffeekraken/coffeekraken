// @ts-nocheck
// @shared
import __upperFirst from '../../string/upperFirst';
/**
 * @name              return
 * @namespace           sugar.js.docblock.tags
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxZQUFZLE1BQU0seUJBQXlCLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO0lBQ3JCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNELE9BQU87UUFDTCxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkUsQ0FBQyxDQUFDLEVBQUU7UUFDTixXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDekQsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9