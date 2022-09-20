import type ISCodeExampleComponentProps from './SCodeExample';
import __SCodeExampleWebcomponent from './SCodeExample';

export default function define(
    props: Partial<ISCodeExampleComponentProps> = {},
    tagName = 's-code-example',
) {
    __SCodeExampleWebcomponent.define(
        tagName,
        __SCodeExampleWebcomponent,
        props,
    );
}
