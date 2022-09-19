import __SSliderWebcomponent from './SSliderComponent';
import type ISSliderComponentProps from './SSliderComponent';

export default function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
) {
    __SSliderWebcomponent.define(__SSliderWebcomponent, props, tagName);
}
