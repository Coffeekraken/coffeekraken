"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBench_1 = __importDefault(require("../shared/SBench"));
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
class SBench extends SBench_1.default {
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
    constructor(id, settings) {
        super(id, settings);
        // register hotkeys
        this._registerHotkeys();
    }
    /**
     * Register some hotkeys
     */
    _registerHotkeys() { }
}
exports.default = SBench;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXdDO0FBRXhDLCtFQUErRTtBQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBcUIsTUFBTyxTQUFRLGdCQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLFFBQW1DO1FBQ3ZELEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixLQUFJLENBQUM7Q0FDeEI7QUF0QkQseUJBc0JDIn0=