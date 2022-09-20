import type ISFloatingFeatureProps from './SFloatingFeature';
import __SFloatingFeature from './SFloatingFeature';

export default function define(
    props: Partial<ISFloatingFeatureProps> = {},
    name = 's-floating',
) {
    __SFloatingFeature.define(name, __SFloatingFeature, {
        ...props,
    });
}
