import { __isInIframe } from '@coffeekraken/sugar/dom';
import type ISCarpenterComponentProps from './SCarpenterComponent';
import __SCarpenterComponent from './SCarpenterComponent';

export default function define(
    props: Partial<ISCarpenterComponentProps> = {},
    tagName = 's-carpenter',
) {
    // carpenter cannot be inited into an iframe
    if (__isInIframe()) {
        console.log(
            `<yellow>[SCarpenterComponent]</yellow> Carpenter component will not be registered into an iframe...`,
        );
        return;
    }

    // __SLitComponent.setDefaultProps(`s-carpenter-app`, {
    //     ...(props ?? {}),
    // });
    __SCarpenterComponent.define(tagName, __SCarpenterComponent, props);
}
