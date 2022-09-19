import __SFiltrableInputComponent from './SFiltrableInputComponent';
import type ISFiltrableInputComponentProps from './SFiltrableInputComponent';

export default function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
) {
    __SFiltrableInputComponent.define(
        __SFiltrableInputComponent,
        props,
        tagName,
    );
}
