"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
/**
 * @name                SDobbyReporter
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base reporter
 *
 * @param           {ISDobbyReporterSettings}          [settings={}]           Some settings to configure your dobby reporter instance
 *
 * @example         js
 * import { __SDobbyReporter } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobb extends __SDobbyReporter {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyReporter extends s_class_1.default {
    /**
     * @name        type
     * @type        String
     *
     * Access the reporter type
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get type() {
        return this.metas.type;
    }
    /**
     * @name        name
     * @name        String
     *
     * Access the reporter name
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get name() {
        return this.metas.name;
    }
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(reporterMetas) {
        super();
        this.metas = reporterMetas;
        this.settings = reporterMetas.settings;
    }
}
exports.default = SDobbyReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBSzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQXFCLGNBQWUsU0FBUSxpQkFBUTtJQXVCaEQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksYUFBb0M7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBaEVELGlDQWdFQyJ9