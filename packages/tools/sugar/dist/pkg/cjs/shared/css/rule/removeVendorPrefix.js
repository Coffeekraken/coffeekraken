"use strict";
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
 * @example  	js
 * import { __removeVendorPrefix } from '@coffeekraken/sugar/css';
 * __removeVendorPrefix('moz-something'); // 'something'
 *
 * @see            https://github.com/marionebl/jogwheel/blob/master/source/library/remove-vendor-prefix.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const prefixes = ['ms', 'webkit', 'moz'];
function __removeVendorPrefix(propertyName = '') {
    const fragments = propertyName.split('-');
    if (prefixes.indexOf(fragments[1]) > -1) {
        return fragments.slice(2).join('-');
    }
    return propertyName;
}
exports.default = __removeVendorPrefix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHOztBQUVILE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUV6QyxTQUF3QixvQkFBb0IsQ0FBQyxZQUFZLEdBQUcsRUFBRTtJQUMxRCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQVJELHVDQVFDIn0=