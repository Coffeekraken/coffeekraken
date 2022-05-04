/**
 * Gets map of defined styles from CSS2Properties object
 * @param  {CSS2Properties} properties CSS2Properties object to return defined styles from
 * @return {object}       plain object containing defined styles as key value pairs
 * @private
 */

/**
 * @name      getDefinedStyles
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Gets map of defined styles from CSS2Properties object
 *
 * @param           {CSS2Properties}            properties              CSS2Properties object to return defined styles from
 * @return          {object}                   plain object containing defined styles as key value pairs
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __getDefinedStyles from '@coffeekraken/sugar/js/dom/style/getDefinedStyles';
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-defined-styles.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getDefinedStyles(properties) {
    const styles = {};

    for (let i = properties.length - 1; i >= 0; i -= 1) {
        const name = properties.item(i);
        const value = properties.getPropertyValue(name);
        if (value !== 'initial') {
            styles[name] = value;
        }
    }

    return styles;
}
