// @ts-nocheck
import __urlFromString from '@coffeekraken/sugar/shared/url/urlFromString';
/**
 * @name              menuTag
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
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
    if (data &&
        data.value &&
        typeof data.value === 'string') {
        const parts = data.value.split(/\s{2,20000}/).map((l) => l.trim());
        let slug;
        if (parts.length > 1) {
            slug = parts[1];
        }
        else {
            slug = parts[0].split('/').map(l => {
                return __urlFromString(l);
            });
        }
        return {
            tree: parts[0].split('/').map(l => l.trim()),
            slug
        };
    }
    return data.value;
}
export default menuTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLE9BQU8sZUFBZSxNQUFNLDhDQUE4QyxDQUFDO0FBRTNFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhO0lBQ2xDLElBQ0UsSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDaEM7UUFFQSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVDLElBQUk7U0FDTCxDQUFDO0tBQ0Q7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDcEIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=