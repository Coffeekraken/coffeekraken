import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SMitosis
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class allows you to use the AMAZING @builder.io/mitosis compiler on your project with additional features like
 * the possibility to watch your components changes and rebuild it automatically.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your SMitosis instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SMitosis from '@coffeekraken/s-mitosis';
 * const mitosis = new SMitosis();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISMitosisSettings {}

class SMitosis extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISMitosisSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SMitosis',
                    },
                },
                settings || {},
            ),
        );
    }
}

export default SMitosis;
