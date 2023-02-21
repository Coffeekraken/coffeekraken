import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface';
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
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge(
        // @ts-ignore
        __SStdioSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBRzVFLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksRUFBVSxFQUNWLE9BQTBDLEVBQzFDLFFBQW1DO1FBRW5DLEtBQUssQ0FDRCxFQUFFLEVBQ0YsT0FBTyxFQUNQLFdBQVc7UUFDUCxhQUFhO1FBQ2IseUJBQXlCLENBQUMsUUFBUSxFQUFFLEVBQ3BDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=