// @ts-nocheck
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
/**
 * @name              namespace
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLG9CQUFvQixNQUFNLHNEQUFzRCxDQUFDO0FBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNsQyxJQUNJLElBQUk7UUFDSixJQUFJLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUMxQjtRQUNFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNCLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRWxDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtRQUMzQixTQUFTLEdBQUcsb0JBQW9CLENBQzVCLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNyQyxHQUFHLEVBQ0gsR0FBRyxDQUNOLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUNuRCxDQUFDO0tBQ0w7SUFDRCxPQUFPLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==