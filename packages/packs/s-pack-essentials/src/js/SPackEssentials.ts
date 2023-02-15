import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
import { define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature';
import { define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
import { define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature';
import { define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature';
import { define as __SInlineFeatureDefine } from '@coffeekraken/s-inline-feature';
import { define as __SPanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRangeComponentDefine } from '@coffeekraken/s-range-component';
import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
import { define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';

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
export default function SPackEssentials(): void {
    // Attributes
    if (!document.body.hasAttribute('s-sugar')) {
        document.body.setAttribute('s-sugar', 'true');
    }
    if (!document.body.hasAttribute('s-refocus')) {
        document.body.setAttribute('s-refocus', 'true');
    }

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
