import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISScrollComponentProps from './SScrollComponent';
import __SScrollComponent from './SScrollComponent';

export default function define(
    props: Partial<ISScrollComponentProps> = {},
    tagName = 's-scroll',
    settings?: ISLitComponentDefineSettings,
) {
    __SScrollComponent.define(tagName, __SScrollComponent, props, settings);
}
