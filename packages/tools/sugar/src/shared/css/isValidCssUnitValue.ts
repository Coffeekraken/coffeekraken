/**
 * @name            isValidCssUnitValue
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
 * @snippet         __isValidCssUnitValue($1)
 * 
 * @example         js
 * import { __isValidCssUnitValue } from '@coffeekraken/sugar/css';
 * __isValidCssUnitValue('10px'); // => true
 * __isValidCssUnitValue('default'); // => false
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isValidCssUnitValue(value: string | number): boolean {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;

    const unit = value
        .replace(/[0-9,.]+/, '')
        .trim()
        .toLowerCase();

    if (
        [
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
        ].indexOf(unit) === -1
    )
        return false;

    return true;
}
