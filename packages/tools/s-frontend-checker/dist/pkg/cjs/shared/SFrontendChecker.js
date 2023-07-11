"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const SFrontendCheckerSettingsInterface_js_1 = __importDefault(require("./interface/SFrontendCheckerSettingsInterface.js"));
/**
 * @name                SFrontendChecker
 * @namespace            shared
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              wip
 * @private
 *
 * This class allows you to run the SFrontendChecker tool on any website and get back a score as well as details
 * about what can be optimised, etc...
 *
 * @param           {Object}                [settings={}]           An object of settings to configure your glob instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SFrontendChecker from '@coffeekraken/s-frontend-checker';
 * const checker = new SFrontendChecker();
 * const insights = await checker.check();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontendChecker extends s_class_1.default {
    /**
     * @name        icons
     * @type        Record<string, string>
     * @static
     *
     * Access the icons
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get icons() {
        return this.settings.icons;
    }
    /**
     * @name        level
     * @type        Number
     * @static
     *
     * Get the handled level
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get levels() {
        return this.settings.levels;
    }
    /**
     * @name        categories
     * @type        String[]
     * @static
     *
     * Access the categories
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get categories() {
        return this.settings.categories;
    }
    /**
     * @name        statuses
     * @type        String[]
     * @static
     *
     * Access the statuses
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get statuses() {
        return this.settings.statuses;
    }
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings = {}) {
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SFrontendCheckerSettingsInterface_js_1.default.defaults(), settings));
    }
}
exports.default = SFrontendChecker;
/**
 * @name        CATEGORY_ACCESSIBILITY
 * @type        String
 * @static
 *
 * Store the "accessibility" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_ACCESSIBILITY = 'accessibility';
/**
 * @name        CATEGORY_SEO
 * @type        String
 * @static
 *
 * Store the "seo" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_SEO = 'seo';
/**
 * @name        CATEGORY_BEST_PRACTICES
 * @type        String
 * @static
 *
 * Store the "best practices" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_BEST_PRACTICES = 'best pracices';
/**
 * @name        CATEGORY_PERFORMANCE
 * @type        String
 * @static
 *
 * Store the "performance" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_PERFORMANCE = 'performance';
/**
 * @name        CATEGORY_SOCIAL
 * @type        String
 * @static
 *
 * Store the "social" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_SOCIAL = 'social';
/**
 * @name        CATEGORY_NICE_TO_HAVE
 * @type        String
 * @static
 *
 * Store the "nice to have" category
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.CATEGORY_NICE_TO_HAVE = 'nice to have';
/**
 * @name        LEVEL_LOW
 * @type        Number
 * @static
 *
 * Store the "low" level id
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.LEVEL_LOW = 0;
/**
 * @name        LEVEL_MEDIUM
 * @type        Number
 * @static
 *
 * Store the "medium" level id
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.LEVEL_MEDIUM = 1;
/**
 * @name        LEVEL_HIGH
 * @type        Number
 * @static
 *
 * Store the "high" level id
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.LEVEL_HIGH = 2;
/**
 * @name        STATUS_SUCCESS
 * @type        Number
 * @static
 *
 * Store the "success" status
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.STATUS_SUCCESS = 'success';
/**
 * @name        STATUS_WARNING
 * @type        Number
 * @static
 *
 * Store the "warning" status
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.STATUS_WARNING = 'warning';
/**
 * @name        STATUS_ERROR
 * @type        Number
 * @static
 *
 * Store the "error" status
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SFrontendChecker.STATUS_ERROR = 'error';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBeUQ7QUFDekQsNEhBQW1HO0FBRW5HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBcUIsZ0JBQ2pCLFNBQVEsaUJBQVE7SUFtSmhCOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBK0MsRUFBRTtRQUN6RCxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYiw4Q0FBbUMsQ0FBQyxRQUFRLEVBQUUsRUFDOUMsUUFBUSxDQUNYLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBOU5MLG1DQStOQztBQTNORzs7Ozs7Ozs7O0dBU0c7QUFDSSx1Q0FBc0IsR0FBRyxlQUFlLENBQUM7QUFFaEQ7Ozs7Ozs7OztHQVNHO0FBQ0ksNkJBQVksR0FBRyxLQUFLLENBQUM7QUFFNUI7Ozs7Ozs7OztHQVNHO0FBQ0ksd0NBQXVCLEdBQUcsZUFBZSxDQUFDO0FBRWpEOzs7Ozs7Ozs7R0FTRztBQUNJLHFDQUFvQixHQUFHLGFBQWEsQ0FBQztBQUU1Qzs7Ozs7Ozs7O0dBU0c7QUFDSSxnQ0FBZSxHQUFHLFFBQVEsQ0FBQztBQUVsQzs7Ozs7Ozs7O0dBU0c7QUFDSSxzQ0FBcUIsR0FBRyxjQUFjLENBQUM7QUFFOUM7Ozs7Ozs7OztHQVNHO0FBQ0ksMEJBQVMsR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7Ozs7OztHQVNHO0FBQ0ksNkJBQVksR0FBRyxDQUFDLENBQUM7QUFFeEI7Ozs7Ozs7OztHQVNHO0FBQ0ksMkJBQVUsR0FBRyxDQUFDLENBQUM7QUFFdEI7Ozs7Ozs7OztHQVNHO0FBQ0ksK0JBQWMsR0FBRyxTQUFTLENBQUM7QUFFbEM7Ozs7Ozs7OztHQVNHO0FBQ0ksK0JBQWMsR0FBRyxTQUFTLENBQUM7QUFFbEM7Ozs7Ozs7OztHQVNHO0FBQ0ksNkJBQVksR0FBRyxPQUFPLENBQUMifQ==