/**
 * @name            isValidUnitValue
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          ts
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        '%'
    ].indexOf(unit) === -1)
        return false;
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWYWxpZFVuaXRWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzVmFsaWRVbml0VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsS0FBc0I7SUFDN0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDM0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsTUFBTSxJQUFJLEdBQUcsS0FBSztTQUNmLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBQ3ZCLElBQUksRUFBRTtTQUNOLFdBQVcsRUFBRSxDQUFDO0lBRWpCLElBQ0U7UUFDRSxJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixLQUFLO1FBQ0wsSUFBSTtRQUNKLElBQUk7UUFDSixNQUFNO1FBQ04sTUFBTTtRQUNOLEdBQUc7S0FDSixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsT0FBTyxLQUFLLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNkLENBQUMifQ==