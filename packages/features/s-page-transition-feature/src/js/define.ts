import type ISPageTransitionFeatureProps from './SPageTransitionFeature';
import __SPageTransitionFeature from './SPageTransitionFeature';

export default function define(
    props: Partial<ISPageTransitionFeatureProps> = {},
    name = 's-page-transition',
) {
    __SPageTransitionFeature.define(name, __SPageTransitionFeature, {
        ...props,
    });
}
