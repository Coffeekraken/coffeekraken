// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import { __clone } from '@coffeekraken/sugar/object';

import __SDuration from '@coffeekraken/s-duration';

import __SFrontendChecker from '../shared/SFrontendChecker';

import type {
    ISFrontendChecker,
    ISFrontendCheckerCheckCheckResult,
    ISFrontendCheckerCheckObj,
    ISFrontendCheckerCheckParams,
    ISFrontendCheckerCheckResult,
    ISFrontendCheckerSettings,
} from './types';

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
import __emptyLinks from './checks/emptyLinks';
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

export default class SFrontendChecker
    extends __SFrontendChecker
    implements ISFrontendChecker
{
    /**
     * Store the registered checks
     */
    static _registeredChecks: { [key: string]: ISFrontendCheckerCheckObj } = {};

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
        super(settings);
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
    check(
        params?: ISFrontendCheckerCheckParams,
    ): Promise<ISFrontendCheckerCheckResult> {
        const finalParams = <ISFrontendCheckerCheckParams>{
            $context: document,
            includeLazy: false,
            ...(params ?? {}),
        };

        const checksResult: ISFrontendCheckerCheckResult = {
            score: null,
            duration: null,
            checks: this.getChecksToRun(),
        };

        let lostPoints = 0,
            potentialPoints = 0;

        const duration = new __SDuration();

        // update checks running status
        this._areChecksRunning = true;

        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            emit('checks.start', checksResult);

            for (let [checkId, checkObj] of Object.entries(
                checksResult.checks,
            )) {
                const originalCheckFn = checkObj.check;

                // handle the points
                potentialPoints += 10;

                // settings
                const checkSettings = this.settings.checks?.[checkId] ?? {};

                checkObj.check = (set = checkSettings) => {
                    return new __SPromise(async (promise) => {
                        // start the check duration
                        const checkDuration = new __SDuration();
                        // update checks running status
                        this._areChecksRunning = true;
                        // remove potential points for this check
                        lostPoints += checkObj.lostPoints ?? 0;
                        // reset the checkObj
                        delete checkObj.result;
                        checkObj.duration = null;
                        checkObj.isChecking = true;
                        checkObj.logs = [];
                        // emit start event
                        promise.emit('start', checkObj);
                        emit('check.start', checkObj);
                        // execute the check
                        const checkResult: ISFrontendCheckerCheckCheckResult =
                            await originalCheckFn({
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
                    });
                };

                // filter some filters
                if (!finalParams.includeLazy && checkObj.lazy) {
                    continue;
                }

                // run the cheeck
                await checkObj.check();
            }

            // points
            checksResult.potentialPoints = potentialPoints;
            checksResult.lostPoints = lostPoints;
            checksResult.score = Math.round(
                (100 / potentialPoints) * (potentialPoints - lostPoints),
            );

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
