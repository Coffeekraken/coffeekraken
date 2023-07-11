// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface.js';
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
export default class SFrontendChecker extends __SClass {
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
        super(__deepMerge(
        // @ts-ignore
        __SFrontendCheckerSettingsInterface.defaults(), settings));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxtQ0FBbUMsTUFBTSxrREFBa0QsQ0FBQztBQUVuRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQ2pCLFNBQVEsUUFBUTtJQW1KaEI7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUErQyxFQUFFO1FBQ3pELEtBQUssQ0FDRCxXQUFXO1FBQ1AsYUFBYTtRQUNiLG1DQUFtQyxDQUFDLFFBQVEsRUFBRSxFQUM5QyxRQUFRLENBQ1gsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUExTkQ7Ozs7Ozs7OztHQVNHO0FBQ0ksdUNBQXNCLEdBQUcsZUFBZSxDQUFDO0FBRWhEOzs7Ozs7Ozs7R0FTRztBQUNJLDZCQUFZLEdBQUcsS0FBSyxDQUFDO0FBRTVCOzs7Ozs7Ozs7R0FTRztBQUNJLHdDQUF1QixHQUFHLGVBQWUsQ0FBQztBQUVqRDs7Ozs7Ozs7O0dBU0c7QUFDSSxxQ0FBb0IsR0FBRyxhQUFhLENBQUM7QUFFNUM7Ozs7Ozs7OztHQVNHO0FBQ0ksZ0NBQWUsR0FBRyxRQUFRLENBQUM7QUFFbEM7Ozs7Ozs7OztHQVNHO0FBQ0ksc0NBQXFCLEdBQUcsY0FBYyxDQUFDO0FBRTlDOzs7Ozs7Ozs7R0FTRztBQUNJLDBCQUFTLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7Ozs7Ozs7R0FTRztBQUNJLDZCQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXhCOzs7Ozs7Ozs7R0FTRztBQUNJLDJCQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7Ozs7Ozs7R0FTRztBQUNJLCtCQUFjLEdBQUcsU0FBUyxDQUFDO0FBRWxDOzs7Ozs7Ozs7R0FTRztBQUNJLCtCQUFjLEdBQUcsU0FBUyxDQUFDO0FBRWxDOzs7Ozs7Ozs7R0FTRztBQUNJLDZCQUFZLEdBQUcsT0FBTyxDQUFDIn0=