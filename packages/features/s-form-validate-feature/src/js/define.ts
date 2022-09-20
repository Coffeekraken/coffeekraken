import type ISFormValidateFeatureProps from './SFormValidateFeature';
import __SFormValidateFeature from './SFormValidateFeature';

export default function define(
    props: Partial<ISFormValidateFeatureProps> = {},
    name = 's-form-validate',
) {
    __SFormValidateFeature.define(name, __SFormValidateFeature, {
        mountWhen: 'interact',
        ...props,
    });
}
