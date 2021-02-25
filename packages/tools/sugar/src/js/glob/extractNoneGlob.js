// @ts-nocheck
// @shared
import __globParent from 'glob-parent';
/**
 * @name                extractNoneGlob
 * @namespace           sugar.js.glob
 * @type                Function
 * @stable
 *
 * This function simply return you the none glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the none glob part
 * @return      {String}                            The none glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extractNoneGlob from '@coffeekraken/sugar/js/glob/extractNoneGlob';
 * extractNoneGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractNoneGlob(string) {
    const parent = __globParent(string);
    return parent;
}
export default extractNoneGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdE5vbmVHbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0cmFjdE5vbmVHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxlQUFlLENBQUMsTUFBTTtJQUM3QixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsZUFBZSxDQUFDIn0=