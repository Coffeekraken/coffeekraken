import type ISPageTransitionFeatureProps from './SPageTransitionFeature.js';
import __SPageTransitionFeature from './SPageTransitionFeature.js';

export default function define(
    props: Partial<ISPageTransitionFeatureProps> = {},
    name = 's-page-transition',
) {
    __SPageTransitionFeature.define(name, __SPageTransitionFeature, {
        ...props,
    });
}
