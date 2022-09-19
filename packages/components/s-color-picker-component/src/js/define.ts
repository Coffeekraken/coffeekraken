import __SColorPickerWebcomponent from './SColorPickerComponent';
import type ISColorPickerComponentProps from './SColorPickerComponent';

export default function define(
    props: Partial<ISColorPickerComponentProps> = {},
    tagName = 's-color-picker',
) {
    __SColorPickerWebcomponent.define(
        __SColorPickerWebcomponent,
        props,
        tagName,
    );
}
