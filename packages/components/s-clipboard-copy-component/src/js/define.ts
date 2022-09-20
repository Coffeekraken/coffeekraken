import type ISClipboardCopyComponentProps from './SClipboardCopy';
import __SClipboardCopyWebcomponent from './SClipboardCopy';

export default function define(
    props: Partial<ISClipboardCopyComponentProps> = {},
    tagName = 's-clipboard-copy',
) {
    __SClipboardCopyWebcomponent.define(
        tagName,
        __SClipboardCopyWebcomponent,
        props,
    );
}
