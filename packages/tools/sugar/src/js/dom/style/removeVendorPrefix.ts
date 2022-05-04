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
