"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isValidUnitValue
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function tells you if the passed value is a valid css unit based one like 10px, 20em, etc...
 *
 * @param       {String|Number}         value       The value to check
 * @return      {Boolean}                           true if is a valid unit based value, false if not
 *
 * @example         js
 * import isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
 * isValidUnitValue('10px'); // => true
 * isValidUnitValue('default'); // => false
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isValidUnitValue(value) {
    if (typeof value === 'number')
        return true;
    if (typeof value !== 'string')
        return false;
    const unit = value
        .replace(/[0-9,.]+/, '')
        .trim()
        .toLowerCase();
    if ([
        'cm',
        'mm',
        'in',
        'px',
        'pt',
        'pc',
        'em',
        'ex',
        'ch',
        'rem',
        'vw',
        'vh',
        'vmin',
        'vmax',
        '%',
    ].indexOf(unit) === -1)
        return false;
    return true;
}
exports.default = isValidUnitValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsS0FBc0I7SUFDM0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDM0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsTUFBTSxJQUFJLEdBQUcsS0FBSztTQUNiLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBQ3ZCLElBQUksRUFBRTtTQUNOLFdBQVcsRUFBRSxDQUFDO0lBRW5CLElBQ0k7UUFDSSxJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixLQUFLO1FBQ0wsSUFBSTtRQUNKLElBQUk7UUFDSixNQUFNO1FBQ04sTUFBTTtRQUNOLEdBQUc7S0FDTixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsT0FBTyxLQUFLLENBQUM7SUFFakIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQS9CRCxtQ0ErQkMifQ==