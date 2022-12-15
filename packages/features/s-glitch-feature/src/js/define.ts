import type ISGlitchFeatureProps from './SGlitchFeature';
import __SGlitchFeature from './SGlitchFeature';

export default function define(
    props: Partial<ISGlitchFeatureProps> = {},
    name = 's-glitch',
) {
    __SGlitchFeature.define(name, __SGlitchFeature, {
        ...props,
    });
}
