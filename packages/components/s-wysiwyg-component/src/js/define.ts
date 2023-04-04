import type ISWysiwygComponentProps from './SWysiwygComponent';
import __SWysiwygComponent from './SWysiwygComponent';

export default function define(
    props: Partial<ISWysiwygComponentProps> = {},
    tagName = 's-wysiwyg',
) {
    __SWysiwygComponent.define(tagName, __SWysiwygComponent, props);
}
