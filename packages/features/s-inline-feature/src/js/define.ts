import type ISInlineFeatureProps from './SInlineFeature';
import __SInlineFeature from './SInlineFeature';

export default function define(
    props: Partial<ISInlineFeatureProps> = {},
    name = 's-inline',
) {
    __SInlineFeature.define(name, __SInlineFeature, props);
}
