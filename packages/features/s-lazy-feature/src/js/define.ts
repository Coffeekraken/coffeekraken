import type ISLazyFeatureProps from './SLazyFeature';
import __SLazyFeature from './SLazyFeature';

export default function define(
    props: Partial<ISLazyFeatureProps> = {},
    name = 's-lazy',
) {
    __SLazyFeature.define(name, __SLazyFeature, {
        ...props,
    });
}
