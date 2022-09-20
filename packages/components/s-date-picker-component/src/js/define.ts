import type ISDatetimePickerComponentProps from './SDatetimePickerComponent';
import __SDatetimePickerWebcomponent from './SDatetimePickerComponent';

export default function define(
    props: Partial<ISDatetimePickerComponentProps> = {},
    tagName = 's-datetime-picker',
) {
    __SDatetimePickerWebcomponent.define(
        tagName,
        __SDatetimePickerWebcomponent,
        props,
    );
}
