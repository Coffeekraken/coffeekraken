import type ISActivateFeatureProps from './SActivateFeature.js';
import __SActivateFeature from './SActivateFeature.js';

export default function define(
    props: Partial<ISActivateFeatureProps> = {},
    name = 's-activate',
) {
    __SActivateFeature.define(name, __SActivateFeature, props);
}
