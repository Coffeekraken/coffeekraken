// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';
import __SDuration from '@coffeekraken/s-duration';
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
export default class SFrontendChecker extends __SClass {
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
    static registerCheck(check) {
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
    get checksCount() {
        if (this._checksCount) {
            return this._checksCount;
        }
        this.getChecksToRun(); // the checks count is setted inside this
        return this._checksCount;
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
        this._areChecksRunning = false;
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
    isChecking() {
        return this._areChecksRunning;
    }
    /**
     * Get all the checks to run depending on the statuses, levels and categories
     */
    getChecksToRun() {
        const checks = {};
        for (let [checkId, checkObj] of Object.entries(SFrontendChecker._registeredChecks)) {
            if (!this.categories.includes(checkObj.category))
                continue;
            if (!this.levels.includes(checkObj.level))
                continue;
            checks[checkId] = __clone(SFrontendChecker._registeredChecks[checkId], {
                deep: true,
            });
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
    check($context = document) {
        const checksResult = {
            score: null,
            duration: null,
            checks: this.getChecksToRun(),
        };
        let points = 0, potentialPoints = 0;
        const duration = new __SDuration();
        // update checks running status
        this._areChecksRunning = true;
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('checks.start', checksResult);
            for (let [checkId, checkObj] of Object.entries(checksResult.checks)) {
                const checkDuration = new __SDuration();
                const originalCheckFn = checkObj.check;
                // handle the points
                potentialPoints += checkObj.level + 1;
                points += checkObj.level + 1;
                checkObj.check = () => {
                    return new __SPromise((promise) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        // update checks running status
                        this._areChecksRunning = true;
                        // remove potential points for this check
                        points -= (_a = checkObj.points) !== null && _a !== void 0 ? _a : checkObj.level + 1;
                        // reset the checkObj
                        delete checkObj.result;
                        checkObj.duration = null;
                        checkObj.isChecking = true;
                        // emit start event
                        promise.emit('start', checkObj);
                        emit('check.start', checkObj);
                        // execute the check
                        const checkResult = yield originalCheckFn({ $context });
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
                        checksResult.score = Math.round((100 / potentialPoints) * points);
                        checkObj.duration = checkDuration.end();
                        checkObj.result = checkResult;
                        // update checks running status
                        this._areChecksRunning = false;
                        // emit complete event
                        promise.emit('complete', checkObj);
                        emit('check.complete', checkObj);
                        // resolve the promise
                        promise.resolve(checkObj);
                    }));
                };
                yield checkObj.check();
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
        }));
    }
}
/**
 * Store the registered checks
 */
SFrontendChecker._registeredChecks = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFVbkQsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLG1CQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sa0JBQWtCLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sb0JBQW9CLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxzQkFBc0IsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLGdCQUFnQixNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0s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