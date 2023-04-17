import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISDropzoneComponentProps from './SDropzoneComponent';
import __SDropzoneComponent from './SDropzoneComponent';

export default function define(
    props: Partial<ISDropzoneComponentProps> = {},
    tagName = 's-dropzone',
    settings?: ISLitComponentDefineSettings,
) {
    __SDropzoneComponent.define(tagName, __SDropzoneComponent, props, settings);
}
