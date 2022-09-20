import type ISColorPickerComponentProps from './SColorPickerComponent';
import __SColorPickerWebcomponent from './SColorPickerComponent';

export default function define(
    props: Partial<ISColorPickerComponentProps> = {},
    tagName = 's-color-picker',
) {
    __SColorPickerWebcomponent.define(
        tagName,
        __SColorPickerWebcomponent,
        props,
    );
}
