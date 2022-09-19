import __SRatingComponent from './SRatingComponent';
import type ISRatingComponentProps from './SRatingComponent';

export default function define(
    props: Partial<ISRatingComponentProps> = {},
    tagName = 's-rating',
) {
    __SRatingComponent.define(__SRatingComponent, props, tagName);
}
