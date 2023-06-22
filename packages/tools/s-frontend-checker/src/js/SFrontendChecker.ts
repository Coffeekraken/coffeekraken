// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';

import __SDuration from '@coffeekraken/s-duration';

import type {
    ISFrontendChecker,
    ISFrontendCheckerCheckCheckResult,
    ISFrontendCheckerCheckObj,
    ISFrontendCheckerCheckResult,
    ISFrontendCheckerSettings,
} from './types';

import __ariaBanner from './checks/ariaBanner';
import __ariaButtonLabel from './checks/ariaButtonLabel';
import __ariaColorContrast from './checks/ariaColorContrast';
import __ariaComplmentary from './checks/ariaComplementary';
import __ariaContentInfo from './checks/ariaContentInfo';
import __ariaDescribedBy from './checks/ariaDescribedBy';
import __ariaFieldsetLegend from './checks/ariaFieldsetLegend';
import __ariaFigureFigcaption from './checks/ariaFigureFigcaption';
import __ariaForm from './checks/ariaForm';
import __ariaLabelForm from './checks/ariaLabelForm';
import __ariaLabelledBy from './checks/ariaLabelledBy';
import __ariaMain from './checks/ariaMain';
import __ariaRoles from './checks/ariaRoles';
import __ariaSearch from './checks/ariaSearch';
import __ariaTableCaption from './checks/ariaTableCaption';
import __ariaTree from './checks/ariaTree';
import __author from './checks/author';
import __bTag from './checks/bTag';
import __charset from './checks/charset';
import __comments from './checks/comments';
import __cssOrder from './checks/cssOrder';
import __description from './checks/description';
import __direction from './checks/direction';
import __doctype from './checks/doctype';
import __footer from './checks/footer';
import __header from './checks/header';
import __iTag from './checks/iTag';
import __imagesAlt from './checks/imagesAlt';
import __imagesFigure from './checks/imagesFigure';
import __keywords from './checks/keywords';
import __language from './checks/language';
import __linksTitle from './checks/linksTitle';
import __main from './checks/main';
import __navRoleAttribute from './checks/navRoleAttribute';
import __noopener from './checks/noopener';
import __opengraph from './checks/opengraph';
import __printStylesheet from './checks/printStylesheet';
import __title from './checks/title';
import __twitterCard from './checks/twitterCard';
import __uniqueIds from './checks/uniqueIds';
import __viewport from './checks/viewport';
import __visualFocus from './checks/visualFocus';
import __w3c from './checks/w3c';
import __webpImages from './checks/webpImages';

/**
 * @name                SFrontendChecker
 * @namespace            js
 * @type                Class
 * @platform            js
 * @status              wip
 *
 * This class represent a glob pattern and can be used to resolve some globs and get back
 * an array of SFile instances or to extract some part of the pattern, etc...
 *
 * @param           {String|Array<String>}          globs            The glob pattern(s) you want to use with this instance
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
     * Store the registered checks
     */
    static _registeredChecks: { [key: string]: ISFrontendCheckerCheckObj } = {};

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
     * @name          registerCheck
     * @type          Function
     * @static
     *
     * This method allows you to register a new check to the SFrontendChecker class.
     *
     * @param       {ISFrontendCheckerCheckFn}          checkFn        The check function
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerCheck(
        check: ISFrontendCheckerCheckObj | Function<ISFrontendCheckerCheckObj>,
    ) {
        // setTimeout(() => {
        if (typeof check === 'function') {
            const checkObj = check(SFrontendChecker);
            this._registeredChecks[checkObj.id] = checkObj;
            return;
        }
        this._registeredChecks[check.id] = check;
        // });
    }

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
     * @name        checksCount
     * @type        String[]
     * @static
     *
     * Get how many checks are eligible in this instance depending on categories and levels.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _checksCount;
    get checksCount(): number {
        if (this._checksCount) {
            return this._checksCount;
        }
        this.getChecksToRun(); // the checks count is setted inside this
        return this._checksCount;
    }

    _areChecksRunning = false;

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

    /**
     * @name            isChecking
     * @type            Function
     *
     * Return true if a check is occuring, false if not
     *
     * @return      {Boolean}               true if a check is occuring, false if not
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isChecking(): boolean {
        return this._areChecksRunning;
    }

    /**
     * Get all the checks to run depending on the statuses, levels and categories
     */
    getChecksToRun(): Record<string, ISFrontendCheckerCheckObj> {
        const checks = {};
        for (let [checkId, checkObj] of Object.entries(
            SFrontendChecker._registeredChecks,
        )) {
            if (!this.categories.includes(checkObj.category)) continue;
            if (!this.levels.includes(checkObj.level)) continue;
            checks[checkId] = __clone(
                SFrontendChecker._registeredChecks[checkId],
                {
                    deep: true,
                },
            );
        }

        // set the checks count
        this._checksCount = Object.keys(checks).length;

        return checks;
    }

    /**
     * @name          check
     * @type          Function
     * @async
     *
     * Check the passed context and returns some insights about what is good and what's not.
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    check($context = document): Promise<ISFrontendCheckerCheckResult> {
        const checksResult: ISFrontendCheckerCheckResult = {
            score: null,
            duration: null,
            checks: this.getChecksToRun(),
        };

        let points = 0,
            potentialPoints = 0;

        const duration = new __SDuration();

        // update checks running status
        this._areChecksRunning = true;

        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            emit('checks.start', checksResult);

            for (let [checkId, checkObj] of Object.entries(
                checksResult.checks,
            )) {
                const checkDuration = new __SDuration();
                const originalCheckFn = checkObj.check;

                // handle the points
                potentialPoints += checkObj.level + 1;
                points += checkObj.level + 1;

                checkObj.check = () => {
                    return new __SPromise(async (promise) => {
                        // update checks running status
                        this._areChecksRunning = true;
                        // remove potential points for this check
                        points -= checkObj.points ?? checkObj.level + 1;
                        // reset the checkObj
                        delete checkObj.result;
                        checkObj.duration = null;
                        checkObj.isChecking = true;
                        // emit start event
                        promise.emit('start', checkObj);
                        emit('check.start', checkObj);
                        // execute the check
                        const checkResult: ISFrontendCheckerCheckCheckResult =
                            await originalCheckFn({ $context });
                        // update the points
                        let resultPoints = 0;
                        switch (checkResult.status) {
                            case SFrontendChecker.STATUS_WARNING:
                                // half points
                                resultPoints = (checkObj.level + 1) * 0;
                                break;
                            case SFrontendChecker.STATUS_SUCCESS:
                                // all points
                                resultPoints = checkObj.level + 1;
                                break;
                        }
                        // update points
                        points += resultPoints;
                        // update the checkObj
                        checkObj.points = resultPoints;
                        checkObj.isChecking = false;
                        checksResult.score = Math.round(
                            (100 / potentialPoints) * points,
                        );
                        checkObj.duration = checkDuration.end();
                        checkObj.result = checkResult;
                        // update checks running status
                        this._areChecksRunning = false;
                        // emit complete event
                        promise.emit('complete', checkObj);
                        emit('check.complete', checkObj);
                        // resolve the promise
                        promise.resolve(checkObj);
                    });
                };
                await checkObj.check();
            }

            // points
            checksResult.potentialPoints = potentialPoints;
            checksResult.points = points;
            checksResult.score = Math.round((100 / potentialPoints) * points);

            // duration
            checksResult.duration = duration.end();

            // update checks running status
            this._areChecksRunning = false;

            // emit complete event and resolve promise
            emit('checks.complete', checksResult);
            resolve(checksResult);
        });
    }
}

// register default checks
SFrontendChecker.registerCheck(__doctype);
SFrontendChecker.registerCheck(__charset);
SFrontendChecker.registerCheck(__viewport);
SFrontendChecker.registerCheck(__title);
SFrontendChecker.registerCheck(__description);
SFrontendChecker.registerCheck(__keywords);
SFrontendChecker.registerCheck(__author);
SFrontendChecker.registerCheck(__direction);
SFrontendChecker.registerCheck(__language);
SFrontendChecker.registerCheck(__cssOrder);
SFrontendChecker.registerCheck(__opengraph);
SFrontendChecker.registerCheck(__twitterCard);
SFrontendChecker.registerCheck(__noopener);
SFrontendChecker.registerCheck(__comments);
SFrontendChecker.registerCheck(__w3c);
SFrontendChecker.registerCheck(__printStylesheet);
SFrontendChecker.registerCheck(__uniqueIds);
SFrontendChecker.registerCheck(__webpImages);
SFrontendChecker.registerCheck(__imagesAlt);
SFrontendChecker.registerCheck(__imagesFigure);
SFrontendChecker.registerCheck(__header);
SFrontendChecker.registerCheck(__footer);
SFrontendChecker.registerCheck(__bTag);
SFrontendChecker.registerCheck(__iTag);
SFrontendChecker.registerCheck(__linksTitle);
SFrontendChecker.registerCheck(__navRoleAttribute);
SFrontendChecker.registerCheck(__main);
SFrontendChecker.registerCheck(__ariaForm);
SFrontendChecker.registerCheck(__ariaMain);
SFrontendChecker.registerCheck(__ariaBanner);
SFrontendChecker.registerCheck(__ariaComplmentary);
SFrontendChecker.registerCheck(__ariaContentInfo);
SFrontendChecker.registerCheck(__ariaSearch);
SFrontendChecker.registerCheck(__ariaTree);
SFrontendChecker.registerCheck(__ariaRoles);
SFrontendChecker.registerCheck(__ariaLabelForm);
SFrontendChecker.registerCheck(__ariaFieldsetLegend);
SFrontendChecker.registerCheck(__ariaTableCaption);
SFrontendChecker.registerCheck(__ariaFigureFigcaption);
SFrontendChecker.registerCheck(__ariaButtonLabel);
SFrontendChecker.registerCheck(__ariaDescribedBy);
SFrontendChecker.registerCheck(__ariaLabelledBy);
SFrontendChecker.registerCheck(__visualFocus);
SFrontendChecker.registerCheck(__ariaColorContrast);
