import type ISParallaxFeatureProps from './SParallaxFeature.js';
import __SParallaxFeature from './SParallaxFeature.js';

export default function define(
    props: Partial<ISParallaxFeatureProps> = {},
    name = 's-parallax',
) {
    __SParallaxFeature.define(name, __SParallaxFeature, {
        ...props,
    });
}
