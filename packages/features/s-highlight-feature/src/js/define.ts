import type ISHighlightFeatureProps from './SHighlightFeature';
import __SHighlightFeature from './SHighlightFeature';

export default function define(
    props: Partial<ISHighlightFeatureProps> = {},
    name = 's-highlight',
) {
    __SHighlightFeature.define(name, __SHighlightFeature, {
        ...props,
    });
}
