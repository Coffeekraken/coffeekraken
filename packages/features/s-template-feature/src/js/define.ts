import type ISTemplateFeatureProps from './STemplateFeature';
import __STemplateFeature from './STemplateFeature';

export default function define(
    props: Partial<ISTemplateFeatureProps> = {},
    name = 's-template',
) {
    __STemplateFeature.define(name, __STemplateFeature, {
        ...props,
    });
}
