// @ts-nocheck
/**
 * @name      realHeight
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Return the full height of an element that has maybe a max-height, etc...
 *
 * @param 		{HTMLElement} 		elm 		The element to process
 * @return 		{Number} 						The real height of the element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import realHeight from '@coffeekraken/sugar/js/dom/realHeight';
 * realHeight(myCoolHtmlElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function realHeight(elm) {
    // apply an overflow-y to the element
    elm.style.transition = 'none';
    elm.style.overflowY = 'scroll';
    // get the actual height through the scrollHeight
    const height = elm.scrollHeight;
    // reset the overflowY
    elm.style.overflowY = '';
    elm.style.transition = '';
    // return the height
    return height;
}
export default realHeight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbEhlaWdodC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWxIZWlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHO0lBQ3JCLHFDQUFxQztJQUNyQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQy9CLGlEQUFpRDtJQUNqRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2hDLHNCQUFzQjtJQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzFCLG9CQUFvQjtJQUNwQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==