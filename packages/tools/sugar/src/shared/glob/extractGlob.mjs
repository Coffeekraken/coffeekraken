// @ts-nocheck
import __globParent from 'glob-parent';
/**
 * @name                extractGlob
 * @namespace            js.glob
 * @type                Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractGlob(string) {
    const parent = __globParent(string);
    let final = string.replace(parent, '');
    if (final.slice(0, 1) === '/')
        final = final.slice(1);
    return final;
}
export default extractGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2dsb2IvZXh0cmFjdEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLGFBQWEsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVyxDQUFDLE1BQU07SUFDekIsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=