import type ISSliderComponentProps from './SSliderComponent';
import __SSliderWebcomponent from './SSliderComponent';

export default function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
) {
    __SSliderWebcomponent.define(tagName, __SSliderWebcomponent, props);
}
