import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISDatetimePickerComponentProps from './SDatetimePickerComponent.js';
import __SDatetimePickerWebcomponent from './SDatetimePickerComponent.js';

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
