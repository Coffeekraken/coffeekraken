// @ts-nocheck
import __urlFromString from '@coffeekraken/sugar/shared/url/urlFromString';
/**
 * @name              menuTag
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the menu tag
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
function menuTag(data, blockSettings) {
    if (data && data.value && typeof data.value === 'string') {
        const parts = data.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        let slug;
        if (parts.length > 1) {
            slug = parts[1];
        }
        else {
            slug = parts[0].split('/').map((l) => {
                return __urlFromString(l);
            });
        }
        return {
            tree: parts[0].split('/').map((l) => l.trim()),
            slug,
        };
    }
    return data.value;
}
export default menuTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGVBQWUsTUFBTSw4Q0FBOEMsQ0FBQztBQUUzRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDaEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3RELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFckUsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTztZQUNILElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLElBQUk7U0FDUCxDQUFDO0tBQ0w7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdEIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=