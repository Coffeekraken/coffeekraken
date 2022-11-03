import type ISDropzoneComponentProps from './SDropzoneComponent';
import __SDropzoneComponent from './SDropzoneComponent';

export default function define(
    props: Partial<ISDropzoneComponentProps> = {},
    tagName = 's-dropzone',
) {
    __SDropzoneComponent.define(tagName, __SDropzoneComponent, props);
}
