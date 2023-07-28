import type ISFiltrableInputComponentProps from './SFiltrableInputComponent.js';
import __SFiltrableInputComponent from './SFiltrableInputComponent.js';

export function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
) {
    __SFiltrableInputComponent.define(
        tagName,
        __SFiltrableInputComponent,
        props,
    );
}
