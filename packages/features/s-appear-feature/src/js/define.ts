import type ISAppearFeatureProps from './SAppearFeature';
import __SAppearFeature from './SAppearFeature';

export default function define(
    props: Partial<ISAppearFeatureProps> = {},
    name = 's-appear',
) {
    __SAppearFeature.define(name, __SAppearFeature, {
        mountWhen: 'entersViewport',
        ...props,
    });
}
