import type ISDepsFeatureProps from './SDepsFeature';
import __SDepsFeature from './SDepsFeature';

export default function define(
    props: Partial<ISDepsFeatureProps> = {},
    name = 's-deps',
) {
    __SDepsFeature.define(name, __SDepsFeature, {
        ...props,
    });
}
