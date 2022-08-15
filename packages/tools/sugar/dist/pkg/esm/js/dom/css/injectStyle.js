// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
/**
 * @name            injectStyle
 * @namespace            js.css
 * @type            Function
 * @platform          js
 * @status              beta
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function injectStyle(style, id = `injected-style-${__uniqid()}`, node) {
    var _a;
    if (document.querySelector(`#${id}`))
        return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', `injected-style-${id.toLowerCase()}`);
    $tag.innerHTML = style;
    if (node) {
        node.appendChild($tag);
    }
    else {
        const $firstLink = document.querySelector('head link[rel="stylesheet"]');
        if ($firstLink) {
            (_a = $firstLink.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($tag, $firstLink);
        }
        else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
export default injectStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVyxDQUNoQixLQUFhLEVBQ2IsS0FBYSxrQkFBa0IsUUFBUSxFQUFFLEVBQUUsRUFDM0MsSUFBSTs7SUFFSixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUFFLE9BQU87SUFDN0MsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV2QixJQUFJLElBQUksRUFBRTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7U0FBTTtRQUNILE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLDZCQUE2QixDQUNoQyxDQUFDO1FBQ0YsSUFBSSxVQUFVLEVBQUU7WUFDWixNQUFBLFVBQVUsQ0FBQyxhQUFhLDBDQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==