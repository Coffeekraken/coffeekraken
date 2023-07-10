import { __define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature/lazy';
import { __define as __SAppearFeatureDefine } from '@coffeekraken/s-appear-feature/lazy';
import { __define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component/lazy';
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
export default function SPackEssentials(): void {
    // Components
    __SClipboardCopyComponentDefine();
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
