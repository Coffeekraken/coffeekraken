/**
 * @name      isScrollable
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed element is scrollable or not
 *
 * @return    {Boolean}    true if is scrollable, false if not
 *
 * @snippet         __isScrollable($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isScrollable } from '@coffeekraken/sugar/dom'
 * if (__isScrollable($myElement)) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isScrollable($elm, settings) {
    settings = Object.assign({ x: true, y: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // check only Element nodes
    if (!($elm instanceof Element)) {
        return false;
    }
    const style = window.getComputedStyle($elm);
    var overflowY = style.overflowY.trim();
    var overflowX = style.overflowX.trim();
    const dir = {
        vertical: (overflowY === 'scroll' || overflowY === 'auto') &&
            $elm.scrollHeight > $elm.clientHeight,
        horizontal: (overflowX === 'scroll' || overflowX === 'auto') &&
            $elm.scrollWidth > $elm.clientWidth,
    };
    if (settings.x && dir.horizontal)
        return true;
    if (settings.y && dir.vertical)
        return true;
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBT0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLElBQWlCLEVBQ2pCLFFBQXlDO0lBRXpDLFFBQVEsR0FBRyxnQkFDUCxDQUFDLEVBQUUsSUFBSSxFQUNQLENBQUMsRUFBRSxJQUFJLElBQ0osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLDJCQUEyQjtJQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksT0FBTyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZDLE1BQU0sR0FBRyxHQUFHO1FBQ1IsUUFBUSxFQUNKLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssTUFBTSxDQUFDO1lBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7UUFDekMsVUFBVSxFQUNOLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssTUFBTSxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVc7S0FDMUMsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzVDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==