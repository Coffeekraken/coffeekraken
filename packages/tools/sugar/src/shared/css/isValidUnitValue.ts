/**
 * @name            isValidUnitValue
 * @namespace       shared.css
 * @type            Function
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
export default function isValidUnitValue(value: string | number): boolean {
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
      '%'
    ].indexOf(unit) === -1
  )
    return false;

  return true;
}
