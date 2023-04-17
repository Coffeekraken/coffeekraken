import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISRatingComponentProps from './SRatingComponent';
import __SRatingComponent from './SRatingComponent';

export default function define(
    props: Partial<ISRatingComponentProps> = {},
    tagName = 's-rating',
    settings?: ISLitComponentDefineSettings,
) {
    __SRatingComponent.define(tagName, __SRatingComponent, props, settings);
}
