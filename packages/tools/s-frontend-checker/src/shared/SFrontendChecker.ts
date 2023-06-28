// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';

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

export default class SFrontendChecker
    extends __SClass
    implements ISFrontendChecker
{
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
    static CATEGORY_ACCESSIBILITY = 'accessibility';

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
    static CATEGORY_SEO = 'seo';

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
    static CATEGORY_BEST_PRACTICES = 'best pracices';

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
    static CATEGORY_PERFORMANCE = 'performance';

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
    static CATEGORY_SOCIAL = 'social';

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
    static CATEGORY_NICE_TO_HAVE = 'nice to have';

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
    static LEVEL_LOW = 0;

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
    static LEVEL_MEDIUM = 1;

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
    static LEVEL_HIGH = 2;

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
    static STATUS_SUCCESS = 'success';

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
    static STATUS_WARNING = 'warning';

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
    static STATUS_ERROR = 'error';

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
    get icons(): Record<string, string> {
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
    get levels(): number[] {
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
    get categories(): string[] {
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
    get statuses(): string[] {
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
    constructor(settings: Partial<ISFrontendCheckerSettings> = {}) {
        super(
            __deepMerge(
                // @ts-ignore
                __SFrontendCheckerSettingsInterface.defaults(),
                settings,
            ),
        );
    }
}
