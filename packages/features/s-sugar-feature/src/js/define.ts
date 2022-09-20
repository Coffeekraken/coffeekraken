import type ISSugarFeatureProps from './SSugarFeature';
import __SSugarFeature from './SSugarFeature';

export default function define(
    props: Partial<ISSugarFeatureProps> = {},
    name = 's-sugar',
) {
    __SSugarFeature.define(name, __SSugarFeature, {
        mountWhen: 'direct',
        ...props,
    });
}
