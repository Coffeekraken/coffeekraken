import type ISInlineFeatureProps from './SInlineFeature.js';
import __SInlineFeature from './SInlineFeature.js';

export default function define(
    props: Partial<ISInlineFeatureProps> = {},
    name = 's-inline',
) {
    __SInlineFeature.define(name, __SInlineFeature, props);
}
