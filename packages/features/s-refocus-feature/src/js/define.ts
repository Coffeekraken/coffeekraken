import type ISRefocusFeatureProps from './SRefocusFeature';
import __SRefocusFeature from './SRefocusFeature';

export default function define(
    props: Partial<ISRefocusFeatureProps> = {},
    name = 's-refocus',
) {
    __SRefocusFeature.define(name, __SRefocusFeature, {
        ...props,
    });
}
