import type { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface';

import type { ISStdioSettings } from '../shared/SStdio';
import __SStdio from '../shared/SStdio';

/**
 * @name          SStdio
 * @namespace     js
 * @type          Class
 * @platform        js
 * @status              beta
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/s-stdio';
 * class MyCoolStdio extends SStdio {
 *    constructor(sources, settings = {}) {
 *      super(sources, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SStdio extends __SStdio {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        id: string,
        sources: ISEventEmitter | ISEventEmitter[],
        settings?: Partial<ISStdioSettings>,
    ) {
        super(
            id,
            sources,
            __deepMerge(
                // @ts-ignore
                __SStdioSettingsInterface.defaults(),
                settings ?? {},
            ),
        );
    }
}
