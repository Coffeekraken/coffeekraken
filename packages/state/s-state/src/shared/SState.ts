import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name                SState
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent a state in your application. This state can be updated, saved, restored, etc...
 * You can subscribe to a state to be notified when data are updating inside, etc...
 *
 * @param           {ISStateSettings}          [settings={}]           Some settings to configure your state instance
 *
 * @example         js
 * import SState from '@coffeekraken/s-state';
 * const tester = new SState({
 *      // settings here...
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStateSettings {}

export default class SState extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISStateSettings>) {
        super(
            __deepMerge(
                {
                    ...__SSugarConfig.get('state'),
                },
                settings ?? {},
            ),
        );
    }
}
