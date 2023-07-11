import type ISHighlightFeatureProps from './SHighlightFeature.js';
import __SHighlightFeature from './SHighlightFeature.js';

export default function define(
    props: Partial<ISHighlightFeatureProps> = {},
    name = 's-highlight',
) {
    __SHighlightFeature.define(name, __SHighlightFeature, {
        ...props,
    });
}
