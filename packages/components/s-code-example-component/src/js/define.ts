import __SCodeExampleWebcomponent from './SCodeExample';
import type ISCodeExampleComponentProps from './SCodeExample';

export default function define(
    props: Partial<ISCodeExampleComponentProps> = {},
    tagName = 's-code-example',
) {
    __SCodeExampleWebcomponent.define(
        __SCodeExampleWebcomponent,
        props,
        tagName,
    );
}
