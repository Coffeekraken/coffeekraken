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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0R2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxTQUFTLFdBQVcsQ0FBQyxNQUFNO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7UUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==