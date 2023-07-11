import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISRatingComponentProps from './SRatingComponent.js';
import __SRatingComponent from './SRatingComponent.js';

export default function define(
    props: Partial<ISRatingComponentProps> = {},
    tagName = 's-rating',
    settings?: ISLitComponentDefineSettings,
) {
    __SRatingComponent.define(tagName, __SRatingComponent, props, settings);
}
