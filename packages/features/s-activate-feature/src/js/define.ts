import type ISActivateFeatureProps from './SActivateFeature';
import __SActivateFeature from './SActivateFeature';

export default function define(
    props: Partial<ISActivateFeatureProps> = {},
    name = 's-activate',
) {
    __SActivateFeature.define(name, __SActivateFeature, props);
}
