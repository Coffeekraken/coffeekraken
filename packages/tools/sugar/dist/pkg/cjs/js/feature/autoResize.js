"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
function autoResizeFeature() {
    (0, dom_1.__querySelectorLive)('[auto-resize]', ($elm) => __awaiter(this, void 0, void 0, function* () {
        (0, dom_1.__autoResize)($elm);
    }));
}
exports.default = autoResizeFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRFO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxTQUF3QixpQkFBaUI7SUFDckMsSUFBQSx5QkFBbUIsRUFBQyxlQUFlLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNoRCxJQUFBLGtCQUFZLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFKRCxvQ0FJQyJ9