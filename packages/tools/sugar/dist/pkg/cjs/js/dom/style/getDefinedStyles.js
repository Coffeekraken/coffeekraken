"use strict";
/**
 * Gets map of defined styles from CSS2Properties object
 * @param  {CSS2Properties} properties CSS2Properties object to return defined styles from
 * @return {object}       plain object containing defined styles as key value pairs
 * @private
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import { __getDefinedStyles } from '@coffeekraken/sugar/dom';
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-defined-styles.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getDefinedStyles(properties) {
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
exports.default = __getDefinedStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixrQkFBa0IsQ0FBQyxVQUFVO0lBQ2pELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN4QjtLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVpELHFDQVlDIn0=