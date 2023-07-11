import type ISDepsFeatureProps from './SDepsFeature.js';
import __SDepsFeature from './SDepsFeature.js';

export default function define(
    props: Partial<ISDepsFeatureProps> = {},
    name = 's-deps',
) {
    __SDepsFeature.define(name, __SDepsFeature, {
        ...props,
    });
}
