// @ts-nocheck
/**
 * @name                    px2em
 * @namespace            js.unit
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import px2em from '@coffeekraken/sugar/js/unit/px2em';
 * px2em(36);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function px2em(px, $elm = document.documentElement) {
    return px / parseFloat(getComputedStyle($elm).fontSize || '16px');
}
export default px2em;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHgyZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJweDJlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWU7SUFDOUMsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==