import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISSliderComponentProps from './SSliderComponent';
import __SSliderWebcomponent from './SSliderComponent';

export default function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
    settings?: ISLitComponentDefineSettings,
) {
    __SSliderWebcomponent.define(
        tagName,
        __SSliderWebcomponent,
        props,
        settings,
    );
}
