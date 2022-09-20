import type ISScrollComponentProps from './SScrollComponent';
import __SScrollComponent from './SScrollComponent';

export default function define(
    props: Partial<ISScrollComponentProps> = {},
    tagName = 's-scroll',
) {
    __SScrollComponent.define(tagName, __SScrollComponent, props);
}
