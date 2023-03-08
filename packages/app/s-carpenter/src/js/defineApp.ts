import __SCarpenterAppComponent from './SCarpenterAppComponent';

export default function define(
    props: Partial<ISCarpenterAppComponentProps> = {},
    tagName = 's-carpenter-app',
) {
    __SCarpenterAppComponent.define(tagName, __SCarpenterAppComponent, props);
}
