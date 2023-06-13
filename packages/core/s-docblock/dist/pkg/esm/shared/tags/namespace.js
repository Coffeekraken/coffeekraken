// @ts-nocheck
import { __namespaceCompliant } from '@coffeekraken/sugar/string';
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
        namespace = __namespaceCompliant(`${blockSettings.packageJson.name.replace('/', '.')}.${namespace.replace(/\s{2,9999}|\t/gm, '-')}`);
    }
    return __namespaceCompliant(namespace.replace(/\s{2,9999}|\t/gm, '-'));
}
export default namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDbEMsSUFDSSxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDMUI7UUFDRSxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUVsQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsU0FBUyxHQUFHLG9CQUFvQixDQUM1QixHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDckMsR0FBRyxFQUNILEdBQUcsQ0FDTixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FDbkQsQ0FBQztLQUNMO0lBQ0QsT0FBTyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=