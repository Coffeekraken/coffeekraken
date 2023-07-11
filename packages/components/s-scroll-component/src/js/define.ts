import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISScrollComponentProps from './SScrollComponent.js';
import __SScrollComponent from './SScrollComponent.js';

export default function define(
    props: Partial<ISScrollComponentProps> = {},
    tagName = 's-scroll',
    settings?: ISLitComponentDefineSettings,
) {
    __SScrollComponent.define(tagName, __SScrollComponent, props, settings);
}
