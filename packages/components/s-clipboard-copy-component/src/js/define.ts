import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISClipboardCopyComponentProps from './SClipboardCopy.js';
import __SClipboardCopyWebcomponent from './SClipboardCopy.js';

export default function define(
    props: Partial<ISClipboardCopyComponentProps> = {},
    tagName = 's-clipboard-copy',
    settings?: ISLitComponentDefineSettings,
) {
    __SClipboardCopyWebcomponent.define(
        tagName,
        __SClipboardCopyWebcomponent,
        props,
        settings,
    );
}
