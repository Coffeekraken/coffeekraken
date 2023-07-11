import type ISAppearFeatureProps from './SAppearFeature.js';
import __SAppearFeature from './SAppearFeature.js';

export default function define(
    props: Partial<ISAppearFeatureProps> = {},
    name = 's-appear',
) {
    __SAppearFeature.define(name, __SAppearFeature, {
        mountWhen: 'entersViewport',
        ...props,
    });
}
