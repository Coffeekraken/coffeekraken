import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
import { define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature';
import { define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component/lazy';
import { define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature/lazy';
import { define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature/lazy';
import { define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
import { define as __SPanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRangeComponentDefine } from '@coffeekraken/s-range-component/lazy';
import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
import { define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component/lazy';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
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
export default function SPackEssentials() {
    // Components
    __SClipboardCopyComponentDefine();
    __SPanelComponentDefine();
    __SRangeComponentDefine();
    __SScrollComponentDefine();
    __SSliderComponentDefine();
    // Features
    __SSugarFeatureDefine();
    __SActivateFeatureDefine();
    __SAppearFeatureDefine();
    __SFloatingFeatureDefine();
    __SFormValidateFeatureDefine();
    __SInlineFeatureDefine();
    __SRefocusFeatureDefine();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzFHLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEcsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekYsT0FBTyxFQUFFLE1BQU0sSUFBSSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDM0YsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlO0lBQ25DLGFBQWE7SUFDYiwrQkFBK0IsRUFBRSxDQUFDO0lBQ2xDLHVCQUF1QixFQUFFLENBQUM7SUFDMUIsdUJBQXVCLEVBQUUsQ0FBQztJQUMxQix3QkFBd0IsRUFBRSxDQUFDO0lBQzNCLHdCQUF3QixFQUFFLENBQUM7SUFFM0IsV0FBVztJQUNYLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsd0JBQXdCLEVBQUUsQ0FBQztJQUMzQixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQyJ9