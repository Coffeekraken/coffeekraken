import type ISCarpenterComponentProps from './SCarpenterComponent';
import __SCarpenterComponent from './SCarpenterComponent';

export default function define(
    props: Partial<ISCarpenterComponentProps> = {},
    tagName = 's-carpenter',
) {
    __SCarpenterComponent.define(tagName, __SCarpenterComponent, props);
}
