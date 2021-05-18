// @ts-nocheck
/**
 * @name          canHaveChildren
 * @namespace            js.dom.utils
 * @type          Function
 * @stable
 *
 * This function take as input either a tagName String like "img", "div", etc... or an HTMLElement node
 * and return true or false depending if this element is supposed to have children or not.
 *
 * @param       {String|HTMLElement}          element       The element to check. A tagName like "img", or directly a HTMLElement node reference
 * @return      {Boolean}                                   true if the element is supposed to have children, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import canHaveChildren from '@coffeekraken/sugar/js/dom/canHaveChildren';
 * canHaveChildren('img'); // => false
 * canHaveChildren('div'); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function canHaveChildren(element) {
    if (typeof element === 'string') {
        element = document.createElement(element);
    }
    else if (!(element instanceof HTMLElement)) {
        throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
    }
    if ('canHaveHTML' in element)
        return element.canHaveHTML;
    const tagName = element.tagName;
    const closeTag = `</${tagName}>`.toLowerCase();
    if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
        return true;
    return false;
}
export default canHaveChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuSGF2ZUNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FuSGF2ZUNoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxPQUFPO0lBQzlCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQy9CLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO1NBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxFQUFFO1FBQzVDLE1BQU0sbUdBQW1HLE9BQU8sT0FBTyxHQUFHLENBQUM7S0FDNUg7SUFDRCxJQUFJLGFBQWEsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7UUFDakUsT0FBTyxJQUFJLENBQUM7SUFDZCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLGVBQWUsQ0FBQyJ9