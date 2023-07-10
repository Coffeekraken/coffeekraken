import { __define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature/lazy';
import { __define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature/lazy';
// import { __define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component/lazy';
import { __define as __SSDepsFeatureDefine } from '@coffeekraken/s-deps-feature/lazy';
import { __define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature/lazy';
import { __define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature/lazy';
import { __define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature/lazy';
import { __define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature/lazy';
import { __define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component/lazy';
import { __define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
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
 * - [@coffeekraken/s-deps-feature](/package/@coffeekraken/s-deps-feature/doc/readme)
 * - [@coffeekraken/s-appear-feature](/package/@coffeekraken/s-appear/doc/readme)
 * - [@coffeekraken/s-floating-feature](/package/@coffeekraken/s-floating/doc/readme)
 * - [@coffeekraken/s-form-validate-feature](/package/@coffeekraken/s-form-validate/doc/readme)
 * - [@coffeekraken/s-inline-feature](/package/@coffeekraken/s-inline/doc/readme)
 * - [@coffeekraken/s-refocus-feature](/package/@coffeekraken/s-refocus/doc/readme)
 * - [@coffeekraken/s-sugar-feature](/package/@coffeekraken/s-sugar/doc/readme)
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
    // __SClipboardCopyComponentDefine();
    __SScrollComponentDefine();
    // Features
    __SSugarFeatureDefine();
    __SSDepsFeatureDefine();
    __SActivateFeatureDefine();
    __SAppearFeatureDefine();
    __SFloatingFeatureDefine();
    __SFormValidateFeatureDefine();
    __SInlineFeatureDefine();
    __SRefocusFeatureDefine({
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 200,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLElBQUksd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RixPQUFPLEVBQUUsUUFBUSxJQUFJLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDekYsK0dBQStHO0FBQy9HLE9BQU8sRUFBRSxRQUFRLElBQUkscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0YsT0FBTyxFQUFFLFFBQVEsSUFBSSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxRQUFRLElBQUksc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsUUFBUSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFFBQVEsSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxRQUFRLElBQUkscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZTtJQUNuQyxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLHdCQUF3QixFQUFFLENBQUM7SUFFM0IsV0FBVztJQUNYLHFCQUFxQixFQUFFLENBQUM7SUFDeEIscUJBQXFCLEVBQUUsQ0FBQztJQUN4Qix3QkFBd0IsRUFBRSxDQUFDO0lBQzNCLHNCQUFzQixFQUFFLENBQUM7SUFDekIsd0JBQXdCLEVBQUUsQ0FBQztJQUMzQiw0QkFBNEIsRUFBRSxDQUFDO0lBQy9CLHNCQUFzQixFQUFFLENBQUM7SUFDekIsdUJBQXVCLENBQUM7UUFDcEIsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDOUMsT0FBTyxFQUFFLEdBQUc7S0FDZixDQUFDLENBQUM7QUFDUCxDQUFDIn0=