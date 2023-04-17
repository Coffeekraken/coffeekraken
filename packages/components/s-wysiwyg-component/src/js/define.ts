import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISWysiwygComponentProps from './SWysiwygComponent';
import __SWysiwygComponent from './SWysiwygComponent';

export default function define(
    props: Partial<ISWysiwygComponentProps> = {},
    tagName = 's-wysiwyg',
    settings?: ISLitComponentDefineSettings,
) {
    __SWysiwygComponent.define(tagName, __SWysiwygComponent, props, settings);
}
