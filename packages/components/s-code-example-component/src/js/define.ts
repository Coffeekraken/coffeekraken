import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISCodeExampleComponentProps from './SCodeExample.js';
import __SCodeExampleWebcomponent from './SCodeExample.js';

export default function define(
    props: Partial<ISCodeExampleComponentProps> = {},
    tagName = 's-code-example',
    settings?: ISLitComponentDefineSettings,
) {
    __SCodeExampleWebcomponent.define(
        tagName,
        __SCodeExampleWebcomponent,
        props,
        settings,
    );
}
