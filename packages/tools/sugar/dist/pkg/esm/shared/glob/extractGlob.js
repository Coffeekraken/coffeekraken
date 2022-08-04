// @ts-nocheck
import __globParent from 'glob-parent';
/**
 * @name                extractGlob
 * @namespace            js.glob
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function simply return you the glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the glob part
 * @return      {String}                            The glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extractGlob from '@coffeekraken/sugar/js/glob/extractGlob';
 * extractGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function extractGlob(string) {
    const parent = __globParent(string);
    let final = string.replace(parent, '');
    if (final.slice(0, 1) === '/')
        final = final.slice(1);
    return final;
}
export default extractGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILFNBQVMsV0FBVyxDQUFDLE1BQU07SUFDdkIsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9