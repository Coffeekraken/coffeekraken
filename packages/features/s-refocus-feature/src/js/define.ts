import type ISRefocusFeatureProps from './SRefocusFeature.js';
import __SRefocusFeature from './SRefocusFeature.js';

export default function define(
    props: Partial<ISRefocusFeatureProps> = {},
    name = 's-refocus',
) {
    __SRefocusFeature.define(name, __SRefocusFeature, {
        ...props,
    });
}
