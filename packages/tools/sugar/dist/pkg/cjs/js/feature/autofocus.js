"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
function autoFocusFeature() {
    (0, dom_1.__querySelectorLive)('[autofocus]', ($elm) => {
        var _a, _b;
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
        setTimeout(() => {
            $elm.focus();
        });
    });
}
exports.default = autoFocusFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxTQUF3QixnQkFBZ0I7SUFDcEMsSUFBQSx5QkFBbUIsRUFBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7UUFDeEMsTUFBQSxNQUFBLFFBQVEsQ0FBQyxhQUFhLDBDQUFFLElBQUksa0RBQUksQ0FBQztRQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsbUNBT0MifQ==