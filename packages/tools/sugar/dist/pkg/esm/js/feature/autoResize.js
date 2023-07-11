var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __autoResize from '../dom/input/autoResize.js';
import __querySelectorLive from '../dom/query/querySelectorLive.js';
/**
 *
 * @name 		autoResize
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for "auto-resize" attribute on any textarea, etc...
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __autoResizeFeature()
 *
 * @example       js
 * import { __autoResizeFeature } from '@coffeekraken/sugar/feature';
 * __autoResizeFeature();
 *
 * @example    html
 * <textarea class="s-textarea" auto-resize>
 *    Do something...
 * </textarea>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function autoResizeFeature() {
    __querySelectorLive('[auto-resize]', ($elm) => __awaiter(this, void 0, void 0, function* () {
        __autoResize($elm);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sbUJBQW1CLE1BQU0sbUNBQW1DLENBQUM7QUFFcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCO0lBQ3JDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ2hELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9