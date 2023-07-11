import __SCarpenterAppComponent from './SCarpenterAppComponent.js';

export default function define(
    props: Partial<ISCarpenterAppComponentProps> = {},
    tagName = 's-carpenter-app',
) {
    __SCarpenterAppComponent.define(tagName, __SCarpenterAppComponent, props);
}
