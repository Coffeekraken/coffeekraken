import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature/lazy';
import { define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature/lazy';
import { define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component/lazy';
// import { define as __SSDepsFeatureDefine } from '@coffeekraken/s-deps-feature/lazy';
import { define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature/lazy';
import { define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature/lazy';
import { define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature/lazy';
import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
// import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature/lazy';
import { define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component/lazy';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature/lazy';
/**
 * @name 		                    SPackEssentials
 * @namespace           js
 * @type                        Function
 * @platform            js
 * @status              beta
 *
 * This function init automatically these packages:
 *
 * - [@coffeekraken/s-activate-feature](/package/@coffeekraken/s-activate-feature/doc/readme)
 * - [@coffeekraken/s-deps-feature](/package/@coffeekraken/s-deps-feature/doc/readme)
 * - [@coffeekraken/s-appear-feature](/package/@coffeekraken/s-appear-feature/doc/readme)
 * - [@coffeekraken/s-floating-feature](/package/@coffeekraken/s-floating-feature/doc/readme)
 * - [@coffeekraken/s-form-validate-feature](/package/@coffeekraken/s-form-validate-feature/doc/readme)
 * - [@coffeekraken/s-inline-feature](/package/@coffeekraken/s-inline-feature/doc/readme)
 * - [@coffeekraken/s-refocus-feature](/package/@coffeekraken/s-refocus-feature/doc/readme)
 * - [@coffeekraken/s-sugar-feature](/package/@coffeekraken/s-sugar-feature/doc/readme)
 * - [@coffeekraken/s-lazy-feature](/package/@coffeekraken/s-lazy-feature/doc/readme)
 * - [@coffeekraken/s-scroll-component](/package/@coffeekraken/s-scroll-component/doc/readme)
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
    __SScrollComponentDefine();
    // Features
    __SSugarFeatureDefine();
    __SLazyFeatureDefine();
    // __SSDepsFeatureDefine();
    __SActivateFeatureDefine();
    __SAppearFeatureDefine();
    __SFloatingFeatureDefine();
    __SFormValidateFeatureDefine();
    __SInlineFeatureDefine();
    // __SRefocusFeatureDefine({
    //     trigger: ['event:actual', 'anchor', 'history'],
    //     offsetY: 200,
    // });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkYsT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzFHLHVGQUF1RjtBQUN2RixPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDM0YsT0FBTyxFQUFFLE1BQU0sSUFBSSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxNQUFNLElBQUksc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUUsNEZBQTRGO0FBQzVGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsTUFBTSxJQUFJLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFckY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlO0lBQ25DLGFBQWE7SUFDYiwrQkFBK0IsRUFBRSxDQUFDO0lBQ2xDLHdCQUF3QixFQUFFLENBQUM7SUFFM0IsV0FBVztJQUNYLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsb0JBQW9CLEVBQUUsQ0FBQztJQUN2QiwyQkFBMkI7SUFDM0Isd0JBQXdCLEVBQUUsQ0FBQztJQUMzQixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLDRCQUE0QjtJQUM1QixzREFBc0Q7SUFDdEQsb0JBQW9CO0lBQ3BCLE1BQU07QUFDVixDQUFDIn0=