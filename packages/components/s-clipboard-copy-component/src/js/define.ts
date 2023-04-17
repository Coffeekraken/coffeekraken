import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISClipboardCopyComponentProps from './SClipboardCopy';
import __SClipboardCopyWebcomponent from './SClipboardCopy';

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
