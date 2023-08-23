import { __isInIframe } from '@coffeekraken/sugar/dom';
import type ISCarpenterComponentProps from './SCarpenterComponent.js';
import __SCarpenterComponent from './SCarpenterComponent.js';

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

    if (!document.env) {
        document.env = {};
    }
    document.env.CARPENTER = true;

    __SCarpenterComponent.define(tagName, __SCarpenterComponent, props);
}
