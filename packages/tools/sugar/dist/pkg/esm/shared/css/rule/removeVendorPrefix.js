/**
 * @name      removeVendorPrefix
 * @namespace            js.css.rule
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
 * @snippet         __removeVendorPrefix($1)
 *
 * @example  	js
 * import { __removeVendorPrefix } from '@coffeekraken/sugar/css';
 * __removeVendorPrefix('moz-something'); // 'something'
 *
 * @see            https://github.com/marionebl/jogwheel/blob/master/source/library/remove-vendor-prefix.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const prefixes = ['ms', 'webkit', 'moz'];
export default function __removeVendorPrefix(propertyName = '') {
    const fragments = propertyName.split('-');
    if (prefixes.indexOf(fragments[1]) > -1) {
        return fragments.slice(2).join('-');
    }
    return propertyName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUV6QyxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLFlBQVksR0FBRyxFQUFFO0lBQzFELE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDIn0=