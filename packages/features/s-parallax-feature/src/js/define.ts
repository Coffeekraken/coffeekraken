import type ISParallaxFeatureProps from './SParallaxFeature';
import __SParallaxFeature from './SParallaxFeature';

export default function define(
    props: Partial<ISParallaxFeatureProps> = {},
    name = 's-parallax',
) {
    __SParallaxFeature.define(name, __SParallaxFeature, {
        ...props,
    });
}
