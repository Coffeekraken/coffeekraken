"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_appear_feature_1 = require("@coffeekraken/s-appear-feature");
const lazy_1 = require("@coffeekraken/s-clipboard-copy-component/lazy");
const lazy_2 = require("@coffeekraken/s-floating-feature/lazy");
const lazy_3 = require("@coffeekraken/s-form-validate-feature/lazy");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const lazy_4 = require("@coffeekraken/s-range-component/lazy");
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const lazy_5 = require("@coffeekraken/s-slider-component/lazy");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
/**
 * @name 		                    SPackEssentials
 * @namespace           js
 * @type                        Function
 * @platform            js
 * @status              beta
 *
 * This function init automatically these packages:
 *
 * - [@coffeekraken/s-activate-feature](/package/@coffeekraken/s-activate/doc/readme)
 * - [@coffeekraken/s-appear-feature](/package/@coffeekraken/s-appear/doc/readme)
 * - [@coffeekraken/s-floating-feature](/package/@coffeekraken/s-floating/doc/readme)
 * - [@coffeekraken/s-form-validate-feature](/package/@coffeekraken/s-form-validate/doc/readme)
 * - [@coffeekraken/s-inline-feature](/package/@coffeekraken/s-inline/doc/readme)
 * - [@coffeekraken/s-refocus-feature](/package/@coffeekraken/s-refocus/doc/readme)
 * - [@coffeekraken/s-sugar-feature](/package/@coffeekraken/s-sugar/doc/readme)
 * - [@coffeekraken/s-clipboard-copy-component](/package/@coffeekraken/s-clipboard-copy-component/doc/readme)
 * - [@coffeekraken/s-panel-component](/package/@coffeekraken/s-panel-component/doc/readme)
 * - [@coffeekraken/s-range-component](/package/@coffeekraken/s-range-component/doc/readme)
 * - [@coffeekraken/s-scroll-component](/package/@coffeekraken/s-scroll-component/doc/readme)
 * - [@coffeekraken/s-slider-component](/package/@coffeekraken/s-slider-component/doc/readme)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __SPackEssentials()
 *
 * @example 	js
 * import __SPackEssentials from '@coffeekraken/s-pack-essentials';
 * __SPackEssentials();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function SPackEssentials() {
    // Components
    (0, lazy_1.define)();
    (0, s_panel_component_1.define)();
    (0, lazy_4.define)();
    (0, s_scroll_component_1.define)();
    (0, lazy_5.define)();
    // Features
    (0, s_sugar_feature_1.define)();
    (0, s_activate_feature_1.define)();
    (0, s_appear_feature_1.define)();
    (0, lazy_2.define)();
    (0, lazy_3.define)();
    (0, s_inline_feature_1.define)();
    (0, s_refocus_feature_1.define)({
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 400,
    });
}
exports.default = SPackEssentials;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUVBQXNGO0FBQ3RGLHFFQUFrRjtBQUNsRix3RUFBMEc7QUFDMUcsZ0VBQTJGO0FBQzNGLHFFQUFvRztBQUNwRyxxRUFBa0Y7QUFDbEYsdUVBQW9GO0FBQ3BGLCtEQUF5RjtBQUN6Rix1RUFBb0Y7QUFDcEYseUVBQXNGO0FBQ3RGLGdFQUEyRjtBQUMzRixtRUFBZ0Y7QUFFaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxTQUF3QixlQUFlO0lBQ25DLGFBQWE7SUFDYixJQUFBLGFBQStCLEdBQUUsQ0FBQztJQUNsQyxJQUFBLDBCQUF1QixHQUFFLENBQUM7SUFDMUIsSUFBQSxhQUF1QixHQUFFLENBQUM7SUFDMUIsSUFBQSwyQkFBd0IsR0FBRSxDQUFDO0lBQzNCLElBQUEsYUFBd0IsR0FBRSxDQUFDO0lBRTNCLFdBQVc7SUFDWCxJQUFBLHdCQUFxQixHQUFFLENBQUM7SUFDeEIsSUFBQSwyQkFBd0IsR0FBRSxDQUFDO0lBQzNCLElBQUEseUJBQXNCLEdBQUUsQ0FBQztJQUN6QixJQUFBLGFBQXdCLEdBQUUsQ0FBQztJQUMzQixJQUFBLGFBQTRCLEdBQUUsQ0FBQztJQUMvQixJQUFBLHlCQUFzQixHQUFFLENBQUM7SUFDekIsSUFBQSwwQkFBdUIsRUFBQztRQUNwQixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUM5QyxPQUFPLEVBQUUsR0FBRztLQUNmLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuQkQsa0NBbUJDIn0=