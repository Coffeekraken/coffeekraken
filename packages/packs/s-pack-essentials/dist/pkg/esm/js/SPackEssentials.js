import { __define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
import { __define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature';
import { __define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component/lazy';
import { __define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature/lazy';
import { __define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature/lazy';
import { __define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
import { __define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
import { __define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component';
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
    __SClipboardCopyComponentDefine();
    __SScrollComponentDefine();
    // Features
    __SSugarFeatureDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLElBQUksd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsUUFBUSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsSUFBSSwrQkFBK0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVHLE9BQU8sRUFBRSxRQUFRLElBQUksd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RixPQUFPLEVBQUUsUUFBUSxJQUFJLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDdEcsT0FBTyxFQUFFLFFBQVEsSUFBSSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxRQUFRLElBQUksdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFFBQVEsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWU7SUFDbkMsYUFBYTtJQUNiLCtCQUErQixFQUFFLENBQUM7SUFDbEMsd0JBQXdCLEVBQUUsQ0FBQztJQUUzQixXQUFXO0lBQ1gscUJBQXFCLEVBQUUsQ0FBQztJQUN4Qix3QkFBd0IsRUFBRSxDQUFDO0lBQzNCLHNCQUFzQixFQUFFLENBQUM7SUFDekIsd0JBQXdCLEVBQUUsQ0FBQztJQUMzQiw0QkFBNEIsRUFBRSxDQUFDO0lBQy9CLHNCQUFzQixFQUFFLENBQUM7SUFDekIsdUJBQXVCLENBQUM7UUFDcEIsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDOUMsT0FBTyxFQUFFLEdBQUc7S0FDZixDQUFDLENBQUM7QUFDUCxDQUFDIn0=