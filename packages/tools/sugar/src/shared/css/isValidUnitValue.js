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
export default function isValidUnitValue(value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWYWxpZFVuaXRWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzVmFsaWRVbml0VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFzQjtJQUMzRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUMzQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QyxNQUFNLElBQUksR0FBRyxLQUFLO1NBQ2IsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7U0FDdkIsSUFBSSxFQUFFO1NBQ04sV0FBVyxFQUFFLENBQUM7SUFFbkIsSUFDSTtRQUNJLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLEtBQUs7UUFDTCxJQUFJO1FBQ0osSUFBSTtRQUNKLE1BQU07UUFDTixNQUFNO1FBQ04sR0FBRztLQUNOLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QixPQUFPLEtBQUssQ0FBQztJQUVqQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=