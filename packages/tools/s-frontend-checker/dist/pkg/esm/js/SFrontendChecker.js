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
import __SPromise from '@coffeekraken/s-promise';
import { __clone } from '@coffeekraken/sugar/object';
import __SDuration from '@coffeekraken/s-duration';
import __SFrontendChecker from '../shared/SFrontendChecker';
import __alternateLink from './checks/alternateLink';
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
import __assetsSize from './checks/assetsSize';
import __author from './checks/author';
import __bTag from './checks/bTag';
import __canonicalLink from './checks/canonicalLink';
import __charset from './checks/charset';
import __comments from './checks/comments';
import __criticalCss from './checks/criticalCss';
import __cssOrder from './checks/cssOrder';
import __description from './checks/description';
import __direction from './checks/direction';
import __doctype from './checks/doctype';
import __favicon from './checks/favicon';
import __footer from './checks/footer';
import __header from './checks/header';
import __iTag from './checks/iTag';
import __imagesAlt from './checks/imagesAlt';
import __imagesFigure from './checks/imagesFigure';
import __keywords from './checks/keywords';
import __language from './checks/language';
import __linksTitle from './checks/linksTitle';
import __main from './checks/main';
import __manifest from './checks/manifest';
import __navRoleAttribute from './checks/navRoleAttribute';
import __noopener from './checks/noopener';
import __opengraph from './checks/opengraph';
import __preloadViewportAssets from './checks/preloadViewportAssets';
import __printStylesheet from './checks/printStylesheet';
import __title from './checks/title';
import __twitterCard from './checks/twitterCard';
import __uniqueIds from './checks/uniqueIds';
import __viewport from './checks/viewport';
import __visualFocus from './checks/visualFocus';
import __w3c from './checks/w3c';
import __webappCapable from './checks/webappCapable';
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
export default class SFrontendChecker extends __SFrontendChecker {
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
        super(settings);
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
// expose into window
window.SFrontendChecker = SFrontendChecker;
window.coco = 'PLOP';
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
SFrontendChecker.registerCheck(__favicon);
SFrontendChecker.registerCheck(__manifest);
SFrontendChecker.registerCheck(__webappCapable);
SFrontendChecker.registerCheck(__canonicalLink);
SFrontendChecker.registerCheck(__alternateLink);
SFrontendChecker.registerCheck(__criticalCss);
SFrontendChecker.registerCheck(__preloadViewportAssets);
SFrontendChecker.registerCheck(__assetsSize);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFckQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxrQkFBa0IsTUFBTSw0QkFBNEIsQ0FBQztBQVc1RCxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sbUJBQW1CLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxrQkFBa0IsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxvQkFBb0IsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLHNCQUFzQixNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sZ0JBQWdCLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FB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