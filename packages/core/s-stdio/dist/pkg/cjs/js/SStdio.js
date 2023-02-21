"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const SStdioSettingsInterface_1 = __importDefault(require("./interface/SStdioSettingsInterface"));
const SStdio_1 = __importDefault(require("../shared/SStdio"));
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
class SStdio extends SStdio_1.default {
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
        super(id, sources, (0, object_1.__deepMerge)(
        // @ts-ignore
        SStdioSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    }
}
exports.default = SStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsdURBQXlEO0FBQ3pELGtHQUE0RTtBQUc1RSw4REFBd0M7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQXFCLE1BQU8sU0FBUSxnQkFBUTtJQUN4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEVBQVUsRUFDVixPQUEwQyxFQUMxQyxRQUFtQztRQUVuQyxLQUFLLENBQ0QsRUFBRSxFQUNGLE9BQU8sRUFDUCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLGlDQUF5QixDQUFDLFFBQVEsRUFBRSxFQUNwQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTFCRCx5QkEwQkMifQ==