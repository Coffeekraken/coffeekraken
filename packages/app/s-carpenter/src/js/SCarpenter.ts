import __SClass from '@coffeekraken/s-class';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __sCarpenterAppComponentDefine from './defineApp.js';

import __SFront from '@coffeekraken/s-front';

export interface ISCarpenterSettings {}

export default class SCarpenter extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISCarpenterSettings>) {
        super(__deepMerge({}, settings ?? {}));

        const front = new __SFront({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);

        // components
        __sCarpenterAppComponentDefine({
            ...(__SComponentUtils.getDefaultProps('s-carpenter') ?? {}),
            window: window.top ?? window,
        });
    }
}
