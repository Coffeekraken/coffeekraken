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
    var _a;
    settings = Object.assign({ x: true, y: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // check only Element nodes
    if (!($elm instanceof Element)) {
        return false;
    }
    const style = ((_a = window.parent) !== null && _a !== void 0 ? _a : window).getComputedStyle($elm);
    var overflowY = style.overflowY.trim();
    var overflowX = style.overflowX.trim();
    const dir = {
        vertical: (overflowY === 'scroll' || overflowY === 'auto') &&
            $elm.scrollHeight > $elm.clientHeight,
        horizontal: (overflowX === 'scroll' || overflowX === 'auto') &&
            $elm.scrollWidth > $elm.clientWidth,
    };
    if ($elm.classList.contains('body')) {
        _console.log('b', dir, overflowX, overflowY);
    }
    if (settings.x && dir.horizontal)
        return true;
    if (settings.y && dir.vertical)
        return true;
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBT0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLElBQWlCLEVBQ2pCLFFBQXlDOztJQUV6QyxRQUFRLEdBQUcsZ0JBQ1AsQ0FBQyxFQUFFLElBQUksRUFDUCxDQUFDLEVBQUUsSUFBSSxJQUNKLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRiwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2QyxNQUFNLEdBQUcsR0FBRztRQUNSLFFBQVEsRUFDSixDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1FBQ3pDLFVBQVUsRUFDTixDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXO0tBQzFDLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVU7UUFBRSxPQUFPLElBQUksQ0FBQztJQUM5QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUM1QyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=