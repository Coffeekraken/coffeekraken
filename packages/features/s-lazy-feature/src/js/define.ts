import type ISLazyFeatureProps from './SLazyFeature.js';
import __SLazyFeature from './SLazyFeature.js';

export default function define(
    props: Partial<ISLazyFeatureProps> = {},
    name = 's-lazy',
) {
    __SLazyFeature.define(name, __SLazyFeature, {
        ...props,
    });
}
