import type ISRatingComponentProps from './SRatingComponent';
import __SRatingComponent from './SRatingComponent';

export default function define(
    props: Partial<ISRatingComponentProps> = {},
    tagName = 's-rating',
) {
    __SRatingComponent.define(tagName, __SRatingComponent, props);
}
