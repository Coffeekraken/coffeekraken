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
    check(params) {
        const finalParams = Object.assign({ $context: document, includeLazy: false }, (params !== null && params !== void 0 ? params : {}));
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
            var _a, _b;
            emit('checks.start', checksResult);
            for (let [checkId, checkObj] of Object.entries(checksResult.checks)) {
                const originalCheckFn = checkObj.check;
                // handle the points
                potentialPoints += checkObj.level + 1;
                points += checkObj.level + 1;
                // settings
                const checkSettings = (_b = (_a = this.settings.checks) === null || _a === void 0 ? void 0 : _a[checkId]) !== null && _b !== void 0 ? _b : {};
                checkObj.check = (set = checkSettings) => {
                    return new __SPromise((promise) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        // start the check duration
                        const checkDuration = new __SDuration();
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
                        const checkResult = yield originalCheckFn({
                            $context: finalParams.$context,
                            settings: set,
                        });
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
                // filter some filters
                if (!finalParams.includeLazy && checkObj.lazy) {
                    continue;
                }
                // run the cheeck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFXbkQsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLG1CQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sa0JBQWtCLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sb0JBQW9CLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxzQkFBc0IsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLGdCQUFnQixNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0s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