import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISDatetimePickerComponentProps from './SDatetimePickerComponent';
import __SDatetimePickerWebcomponent from './SDatetimePickerComponent';

export default function define(
    props: Partial<ISDatetimePickerComponentProps> = {},
    tagName = 's-datetime-picker',
    settings?: ISLitComponentDefineSettings,
) {
    __SDatetimePickerWebcomponent.define(
        tagName,
        __SDatetimePickerWebcomponent,
        props,
        settings,
    );
}
