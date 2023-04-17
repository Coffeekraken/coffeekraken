import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISFiltrableInputComponentProps from './SFiltrableInputComponent';
import __SFiltrableInputComponent from './SFiltrableInputComponent';

export default function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
    settings?: ISLitComponentDefineSettings,
) {
    __SFiltrableInputComponent.define(
        tagName,
        __SFiltrableInputComponent,
        props,
        settings,
    );
}
