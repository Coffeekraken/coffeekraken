"use strict";
/**
 * @name      scrollable
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed element is scrollable or not
 *
 * @return    {Boolean}    true if is scrollable, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isScrollable from '@coffeekraken/sugar/js/dom/is/scrollable'
 * if (isScrollable($myElement)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isScrollable($elm, settings) {
    settings = Object.assign({ x: true, y: true }, (settings !== null && settings !== void 0 ? settings : {}));
    const style = window.getComputedStyle($elm);
    var overflowY = style.overflowY.trim();
    var overflowX = style.overflowX.trim();
    if ($elm.classList.contains('s-slider__slides-wrapper')) {
        console.log('COCOCOC', overflowX, overflowY);
    }
    const dir = {
        vertical: (overflowY === 'scroll' || overflowY === 'auto') &&
            $elm.scrollHeight > $elm.clientHeight,
        horizontal: (overflowX === 'scroll' || overflowX === 'auto') &&
            $elm.scrollWidth > $elm.clientWidth,
    };
    if ($elm.classList.contains('s-slider__slides-wrapper')) {
        console.log('COCOCOCffefef', dir);
        if (settings.x && dir.horizontal) {
            console.log('HORIGIN');
        }
    }
    if (settings.x && dir.horizontal)
        return true;
    if (settings.y && dir.vertical)
        return true;
    return false;
}
exports.default = isScrollable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7O0FBT0gsU0FBd0IsWUFBWSxDQUNoQyxJQUFpQixFQUNqQixRQUF5QztJQUV6QyxRQUFRLEdBQUcsZ0JBQ1AsQ0FBQyxFQUFFLElBQUksRUFDUCxDQUFDLEVBQUUsSUFBSSxJQUNKLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRTtRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxNQUFNLEdBQUcsR0FBRztRQUNSLFFBQVEsRUFDSixDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1FBQ3pDLFVBQVUsRUFDTixDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXO0tBQzFDLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtLQUNKO0lBRUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDOUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQXRDRCwrQkFzQ0MifQ==