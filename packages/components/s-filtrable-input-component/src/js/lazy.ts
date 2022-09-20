import type ISFiltrableInputComponentProps from './SFiltrableInputComponent';
import __SFiltrableInputComponent from './SFiltrableInputComponent';

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
