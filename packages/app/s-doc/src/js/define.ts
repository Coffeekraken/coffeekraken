import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISDocComponentProps from './SDocComponent';
import __SDocComponent from './SDocComponent';

export default function define(
    props: Partial<ISDocComponentProps> = {},
    tagName = 's-doc',
    settings?: ISLitComponentDefineSettings,
) {
    __SDocComponent.define(tagName, __SDocComponent, props, settings);
}
