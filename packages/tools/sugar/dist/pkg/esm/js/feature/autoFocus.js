import __querySelectorLive from '../dom/query/querySelectorLive.js';
/**
 *
 * @name 		autoFocus
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Make sure your "autofocus" fields works as expected
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __autoFocusFeature()
 *
 * @example       js
 * import { __autoFocusFeature } from '@coffeekraken/sugar/feature';
 * __autoFocusFeature();
 *
 * @example    html
 * <textarea autofocus class="s-textarea">
 *    Do something...
 * </textarea>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function autoFocusFeature() {
    __querySelectorLive('[autofocus]', ($elm) => {
        var _a, _b;
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
        setTimeout(() => {
            $elm.focus();
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sbUJBQW1CLE1BQU0sbUNBQW1DLENBQUM7QUFFcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCO0lBQ3BDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUN4QyxNQUFBLE1BQUEsUUFBUSxDQUFDLGFBQWEsMENBQUUsSUFBSSxrREFBSSxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==