import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface.js';
import __SStdio from '../shared/SStdio.js';
/**
 * @name          SStdio
 * @namespace     js
 * @type          Class
 * @platform        js
 * @status              beta
 * @private
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
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge(
        // @ts-ignore
        __SStdioSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRy9FLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQUN4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEVBQVUsRUFDVixPQUEwQyxFQUMxQyxRQUFtQztRQUVuQyxLQUFLLENBQ0QsRUFBRSxFQUNGLE9BQU8sRUFDUCxXQUFXO1FBQ1AsYUFBYTtRQUNiLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxFQUNwQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9