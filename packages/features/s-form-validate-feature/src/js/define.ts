import type ISFormValidateFeatureProps from './SFormValidateFeature.js';
import __SFormValidateFeature from './SFormValidateFeature.js';

export default function define(
    props: Partial<ISFormValidateFeatureProps> = {},
    name = 's-form-validate',
) {
    __SFormValidateFeature.define(name, __SFormValidateFeature, {
        mountWhen: 'inViewport',
        ...props,
    });
}
