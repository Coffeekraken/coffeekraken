"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
const s_appear_feature_1 = require("@coffeekraken/s-appear-feature");
const s_clipboard_copy_component_1 = require("@coffeekraken/s-clipboard-copy-component");
const s_floating_feature_1 = require("@coffeekraken/s-floating-feature");
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_range_component_1 = require("@coffeekraken/s-range-component");
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
/**
 * @name 		                    SPackEssentials
 * @namespace           js
 * @type                        Function
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
 * @example 	js
 * import __SPackEssentials from '@coffeekraken/s-pack-essentials';
 * __SPackEssentials();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function SPackEssentials() {
    // components
    (0, s_clipboard_copy_component_1.define)();
    (0, s_panel_component_1.define)();
    (0, s_range_component_1.define)();
    (0, s_scroll_component_1.define)();
    (0, s_slider_component_1.define)();
    // features
    (0, s_sugar_feature_1.define)();
    // __SActivateFeatureDefine();
    (0, s_appear_feature_1.define)();
    (0, s_floating_feature_1.define)();
    (0, s_form_validate_feature_1.define)();
    (0, s_inline_feature_1.define)();
    (0, s_refocus_feature_1.define)();
}
exports.default = SPackEssentials;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUZBQXlGO0FBQ3pGLHFFQUFrRjtBQUNsRix5RkFBcUc7QUFDckcseUVBQXNGO0FBQ3RGLG1GQUErRjtBQUMvRixxRUFBa0Y7QUFDbEYsdUVBQW9GO0FBQ3BGLHVFQUFvRjtBQUNwRix1RUFBb0Y7QUFDcEYseUVBQXNGO0FBQ3RGLHlFQUFzRjtBQUN0RixtRUFBZ0Y7QUFFaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUF3QixlQUFlO0lBQ25DLGFBQWE7SUFDYixJQUFBLG1DQUErQixHQUFFLENBQUM7SUFDbEMsSUFBQSwwQkFBdUIsR0FBRSxDQUFDO0lBQzFCLElBQUEsMEJBQXVCLEdBQUUsQ0FBQztJQUMxQixJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSwyQkFBd0IsR0FBRSxDQUFDO0lBRTNCLFdBQVc7SUFDWCxJQUFBLHdCQUFxQixHQUFFLENBQUM7SUFDeEIsOEJBQThCO0lBQzlCLElBQUEseUJBQXNCLEdBQUUsQ0FBQztJQUN6QixJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSxnQ0FBNEIsR0FBRSxDQUFDO0lBQy9CLElBQUEseUJBQXNCLEdBQUUsQ0FBQztJQUN6QixJQUFBLDBCQUF1QixHQUFFLENBQUM7QUFDOUIsQ0FBQztBQWhCRCxrQ0FnQkMifQ==