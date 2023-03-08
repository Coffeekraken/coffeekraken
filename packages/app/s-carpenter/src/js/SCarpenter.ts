import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { define as _sCarpenterAppComponentDefine } from './SCarpenterAppComponent';

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

        // features
        __sActivateFeature();

        // components
        _sCarpenterAppComponentDefine({
            window: window.top ?? window,
        });
    }
}
