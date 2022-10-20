import type ISSpecsEditorComponentComponentProps from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';

export default function define(
    props: Partial<ISSpecsEditorComponentComponentProps> = {},
    tagName = 's-specs-editor',
) {
    __SSpecsEditorComponent.define(tagName, __SSpecsEditorComponent, props);
}
