/**
 * @name        isMobile
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @feature         Take the theme.media.queries.mobile.maxWidth in consideration if accessible
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isMobile } from 'coffeekraken/sugar/is'
 * if (__isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isMobile() {
    var _a, _b, _c, _d;
    // touch event
    if (!('ontouchstart' in document.documentElement))
        return false;
    // orientation
    if (window.orientation === undefined)
        return false;
    // match media
    const maxWidth = 
    // @ts-ignore
    (_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get('media.queries.mobile.maxWidth')) !== null && _d !== void 0 ? _d : 639;
    if (!window.matchMedia(`only screen and (max-width: ${maxWidth}px)`).matches) {
        return false;
    }
    // limited accuracy
    if (!window.matchMedia('(pointer: coarse)').matches)
        return false;
    // it seems that it's a mobile
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVTs7SUFDOUIsY0FBYztJQUNkLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDaEUsY0FBYztJQUNkLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDbkQsY0FBYztJQUNkLE1BQU0sUUFBUTtJQUNWLGFBQWE7SUFDYixNQUFBLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsS0FBSywwQ0FBRSxHQUFHLENBQUMsK0JBQStCLENBQUMsbUNBQUksR0FBRyxDQUFDO0lBQzVFLElBQ0ksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLCtCQUErQixRQUFRLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFDMUU7UUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELG1CQUFtQjtJQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNsRSw4QkFBOEI7SUFDOUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9