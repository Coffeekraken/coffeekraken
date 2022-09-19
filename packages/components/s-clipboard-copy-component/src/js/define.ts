import __SClipboardCopyWebcomponent from './SClipboardCopy';
import type ISClipboardCopyComponentProps from './SClipboardCopy';

export default function define(
    props: Partial<ISClipboardCopyComponentProps> = {},
    tagName = 's-clipboard-copy',
) {
    __SClipboardCopyWebcomponent.define(
        __SClipboardCopyWebcomponent,
        props,
        tagName,
    );
}
