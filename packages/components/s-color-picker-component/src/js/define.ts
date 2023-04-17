import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISColorPickerComponentProps from './SColorPickerComponent';
import __SColorPickerWebcomponent from './SColorPickerComponent';

export default function define(
    props: Partial<ISColorPickerComponentProps> = {},
    tagName = 's-color-picker',
    settings?: ISLitComponentDefineSettings,
) {
    __SColorPickerWebcomponent.define(
        tagName,
        __SColorPickerWebcomponent,
        props,
        settings,
    );
}
