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
import __SFrontendChecker from '../shared/SFrontendChecker.js';
import __alternateLink from './checks/alternateLink.js';
import __ariaBanner from './checks/ariaBanner.js';
import __ariaButtonLabel from './checks/ariaButtonLabel.js';
import __ariaColorContrast from './checks/ariaColorContrast.js';
import __ariaComplmentary from './checks/ariaComplementary.js';
import __ariaContentInfo from './checks/ariaContentInfo.js';
import __ariaDescribedBy from './checks/ariaDescribedBy.js';
import __ariaFieldsetLegend from './checks/ariaFieldsetLegend.js';
import __ariaFigureFigcaption from './checks/ariaFigureFigcaption.js';
import __ariaForm from './checks/ariaForm.js';
import __ariaLabelForm from './checks/ariaLabelForm.js';
import __ariaLabelledBy from './checks/ariaLabelledBy.js';
import __ariaMain from './checks/ariaMain.js';
import __ariaSearch from './checks/ariaSearch.js';
import __ariaTableCaption from './checks/ariaTableCaption.js';
import __ariaTree from './checks/ariaTree.js';
import __assetsSize from './checks/assetsSize.js';
import __author from './checks/author.js';
import __bTag from './checks/bTag.js';
import __canonicalLink from './checks/canonicalLink.js';
import __charset from './checks/charset.js';
import __comments from './checks/comments.js';
import __criticalCss from './checks/criticalCss.js';
import __cssOrder from './checks/cssOrder.js';
import __description from './checks/description.js';
import __direction from './checks/direction.js';
import __doctype from './checks/doctype.js';
import __emptyLinks from './checks/emptyLinks.js';
import __favicon from './checks/favicon.js';
import __footer from './checks/footer.js';
import __header from './checks/header.js';
import __iTag from './checks/iTag.js';
import __imagesAlt from './checks/imagesAlt.js';
import __imagesFigure from './checks/imagesFigure.js';
import __keywords from './checks/keywords.js';
import __language from './checks/language.js';
import __linksTitle from './checks/linksTitle.js';
import __main from './checks/main.js';
import __manifest from './checks/manifest.js';
import __navRoleAttribute from './checks/navRoleAttribute.js';
import __noopener from './checks/noopener.js';
import __opengraph from './checks/opengraph.js';
import __preloadViewportAssets from './checks/preloadViewportAssets.js';
import __printStylesheet from './checks/printStylesheet.js';
import __title from './checks/title.js';
import __twitterCard from './checks/twitterCard.js';
import __uniqueIds from './checks/uniqueIds.js';
import __viewport from './checks/viewport.js';
import __visualFocus from './checks/visualFocus.js';
import __w3c from './checks/w3c.js';
import __webappCapable from './checks/webappCapable.js';
import __webpImages from './checks/webpImages.js';
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
 * @event           checks.start            Dispatched when the checks are starting
 * @event           check.start             Dispatched when an individual check is starting
 * @event           check.log               Dispatched when an individual check has a new log line
 * @event           check.complete          Dispatched when an individual check is completed
 * @event           checks.complete         Dispatched when the checks are completed
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
        let lostPoints = 0, potentialPoints = 0;
        const duration = new __SDuration();
        // update checks running status
        this._areChecksRunning = true;
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            emit('checks.start', checksResult);
            for (let [checkId, checkObj] of Object.entries(checksResult.checks)) {
                const originalCheckFn = checkObj.check;
                // handle the points
                potentialPoints += 10;
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
                        lostPoints += (_a = checkObj.lostPoints) !== null && _a !== void 0 ? _a : 0;
                        // reset the checkObj
                        delete checkObj.result;
                        checkObj.duration = null;
                        checkObj.isChecking = true;
                        checkObj.logs = [];
                        // emit start event
                        promise.emit('start', checkObj);
                        emit('check.start', checkObj);
                        // execute the check
                        const checkResult = yield originalCheckFn({
                            $context: finalParams.$context,
                            log: (...args) => {
                                checkObj.logs = [...checkObj.logs, ...args];
                                promise.emit('log', checkObj);
                                emit('check.log', checkObj);
                            },
                            settings: set,
                        });
                        // update the points
                        let checkLostPoints = 20 * checkObj.level;
                        switch (checkResult.status) {
                            case SFrontendChecker.STATUS_WARNING:
                                checkLostPoints = 10 * checkObj.level;
                                break;
                            case SFrontendChecker.STATUS_SUCCESS:
                                checkLostPoints = 0;
                                break;
                        }
                        // update points
                        lostPoints += checkLostPoints;
                        // update the checkObj
                        checkObj.lostPoints = checkLostPoints;
                        checkObj.isChecking = false;
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
            checksResult.lostPoints = lostPoints;
            checksResult.score = Math.round((100 / potentialPoints) * (potentialPoints - lostPoints));
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
// SFrontendChecker.registerCheck(__ariaRoles);
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
SFrontendChecker.registerCheck(__emptyLinks);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFckQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxrQkFBa0IsTUFBTSwrQkFBK0IsQ0FBQztBQVcvRCxPQUFPLGVBQWUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLGlCQUFpQixNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sbUJBQW1CLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxrQkFBa0IsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLGlCQUFpQixNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8saUJBQWlCLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxvQkFBb0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLHNCQUFzQixNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sZ0JBQWdCLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxrQkFBa0IsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FB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