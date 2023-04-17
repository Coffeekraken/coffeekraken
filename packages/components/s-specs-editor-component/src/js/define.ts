import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISSpecsEditorComponentComponentProps from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';

export default function define(
    props: Partial<ISSpecsEditorComponentComponentProps> = {},
    tagName = 's-specs-editor',
    settings?: ISLitComponentDefineSettings,
) {
    __SSpecsEditorComponent.define(
        tagName,
        __SSpecsEditorComponent,
        props,
        settings,
    );
}
