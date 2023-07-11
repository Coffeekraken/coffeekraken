import type ISFloatingFeatureProps from './SFloatingFeature.js';
import __SFloatingFeature from './SFloatingFeature.js';

export default function define(
    props: Partial<ISFloatingFeatureProps> = {},
    name = 's-floating',
) {
    __SFloatingFeature.define(name, __SFloatingFeature, {
        ...props,
    });
}
