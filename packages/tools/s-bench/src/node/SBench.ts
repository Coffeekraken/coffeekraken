import __SBench from '../shared/SBench';

// import __SBenchSettingsInterface from './interface/SBenchSettingsInterface';

/**
 * @name            SBench
 * @namespace       node
 * @type            Class
 * @extends         SClass
 * @platform        js
 * @platform        node
 * @status          alpha
 *
 * This class allows you to perform some simple benchmarking actions
 * like dividing a process into multiple "steps" and track the timing
 * between these, etc...
 *
 * @feature         Add "steps" into your processes and get back a performance report from that
 *
 * @example         js
 * import SBench from '@coffeekraken/s-bench';
 *
 * SBench.start('myCoolProcess');
 * // some code...
 * SBench.step('myCoolProcess', 'Before compilation');
 * // compilation code...
 * SBench.step('myCoolProcess', 'After compilation');
 * SBench.end('myCoolProcess');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SBench extends __SBench {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(id: string, settings?: Partial<ISBenchSettings>) {
        super(id, settings);

        // register hotkeys
        this._registerHotkeys();
    }

    /**
     * Register some hotkeys
     */
    _registerHotkeys() {}
}
