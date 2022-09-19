import __SScrollComponent from './SScrollComponent';
import type ISScrollComponentProps from './SScrollComponent';

export default function define(
    props: Partial<ISScrollComponentProps> = {},
    tagName = 's-scroll',
) {
    __SScrollComponent.define(__SScrollComponent, props, tagName);
}
