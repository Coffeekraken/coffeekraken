import type ISSugarFeatureProps from './SSugarFeature.js';
import __SSugarFeature from './SSugarFeature.js';

export default function define(
    props: Partial<ISSugarFeatureProps> = {},
    name = 's-sugar',
) {
    __SSugarFeature.define(name, __SSugarFeature, {
        mountWhen: 'direct',
        ...props,
    });
}
