import __SDatetimePickerWebcomponent from './SDatetimePickerComponent';
import type ISDatetimePickerComponentProps from './SDatetimePickerComponent';

export default function define(
    props: Partial<ISDatetimePickerComponentProps> = {},
    tagName = 's-datetime-picker',
) {
    __SDatetimePickerWebcomponent.define(
        __SDatetimePickerWebcomponent,
        props,
        tagName,
    );
}
