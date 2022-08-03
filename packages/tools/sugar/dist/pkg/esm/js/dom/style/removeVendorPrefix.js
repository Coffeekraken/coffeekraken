/**
 * @name      removeVendorPrefix
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Remove vendor prefixes from CSSPropertyNames
 *
 * @param           {string}            propertyName             prefixed property name
 * @return          {string}              unprefixed property name
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __removeVendorPrefix from '@coffeekraken/sugar/js/dom/style/removeVendorPrefix';
 * __removeVendorPrefix('moz-something'); // 'something'
 *
 * @see            https://github.com/marionebl/jogwheel/blob/master/source/library/remove-vendor-prefix.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const prefixes = ['ms', 'webkit', 'moz'];
export default function removeVendorPrefix(propertyName = '') {
    const fragments = propertyName.split('-');
    if (prefixes.indexOf(fragments[1]) > -1) {
        return fragments.slice(2).join('-');
    }
    return propertyName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFekMsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsRUFBRTtJQUN4RCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQyJ9