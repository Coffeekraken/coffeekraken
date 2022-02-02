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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isScrollable($elm, settings) {
    settings = Object.assign({ x: true, y: true }, settings !== null && settings !== void 0 ? settings : {});
    var overflowY = window.getComputedStyle($elm)['overflow-y'];
    var overflowX = window.getComputedStyle($elm)['overflow-x'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjcm9sbGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBT0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsSUFBaUIsRUFBRSxRQUF5QztJQUM3RixRQUFRLEdBQUcsZ0JBQ1AsQ0FBQyxFQUFFLElBQUksRUFDUCxDQUFDLEVBQUUsSUFBSSxJQUNKLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUNGLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUQsTUFBTSxHQUFHLEdBQUc7UUFDUixRQUFRLEVBQ0osQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUM7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtRQUN6QyxVQUFVLEVBQ04sQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztLQUMxQyxDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDOUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9