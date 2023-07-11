import type ISGlitchFeatureProps from './SGlitchFeature.js';
import __SGlitchFeature from './SGlitchFeature.js';

export default function define(
    props: Partial<ISGlitchFeatureProps> = {},
    name = 's-glitch',
) {
    __SGlitchFeature.define(name, __SGlitchFeature, {
        ...props,
    });
}
