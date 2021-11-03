// @ts-nocheck
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
/**
 * @name              namespace
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the namespace tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @namespace 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function namespace(data, blockSettings) {
    if (data &&
        data.value &&
        typeof data.value === 'string' &&
        data.value.trim() === '') {
        return true;
    }
    let namespace = data.value;
    if (!namespace)
        return data.value;
    if (blockSettings.packageJson) {
        namespace = __namespaceCompliant(`${blockSettings.packageJson.name.replace('/', '.')}.${namespace.replace(/\s{1,9999999}/gm, '-')}`);
    }
    return __namespaceCompliant(namespace.replace(/\s{1,999999}/gm, '-'));
}
export default namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLG9CQUFvQixNQUFNLHNEQUFzRCxDQUFDO0FBRXhGOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhO0lBQ2xDLElBQ0ksSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQzFCO1FBQ0UsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDM0IsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFbEMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFO1FBQzNCLFNBQVMsR0FBRyxvQkFBb0IsQ0FDNUIsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3JDLEdBQUcsRUFDSCxHQUFHLENBQ04sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQ25ELENBQUM7S0FDTDtJQUNELE9BQU8sb0JBQW9CLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9