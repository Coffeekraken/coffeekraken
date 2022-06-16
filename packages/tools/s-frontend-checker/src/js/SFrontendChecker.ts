// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';

import __author from './checks/author';
import __charset from './checks/charset';
import __comments from './checks/comments';
import __cssOrder from './checks/cssOrder';
import __description from './checks/description';
import __direction from './checks/direction';
import __doctype from './checks/doctype';
import __imagesAlt from './checks/imagesAlt';
import __keywords from './checks/keywords';
import __language from './checks/language';
import __noopener from './checks/noopener';
import __opengraph from './checks/opengraph';
import __printStylesheet from './checks/printStylesheet';
import __title from './checks/title';
import __twitterCard from './checks/twitterCard';
import __uniqueIds from './checks/uniqueIds';
import __viewport from './checks/viewport';
import __w3c from './checks/w3c';
import __webpImages from './checks/webpImages';

/**
 * @name                SFrontendCheckeer
 * @namespace            js
 * @type                Class
 * @status              beta
 * @platform            js
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
 * import SFrontendCheckeer from '@coffeekraken/s-frontend-checker';
 * const checker = new SFrontendCheckeer();
 * const insights = await checker.check();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFrontendCheckerSettings {}

export interface ISFrontendCheckerCheckObj {
    id: string;
    name: string;
    description: string;
    level: number;
    check: Function;
}

export interface ISFrontendCheckerCheckResultObj {
    id: string;
    name: string;
    description: string;
    level: number;
    result: ISFrontendCheckerCheckResult;
}

export interface ISFrontendCheckerCheckResultAction {
    label: string;
    handler: Function;
}

export interface ISFrontendCheckerCheckResult {
    status: 'success' | 'warning' | 'error';
    message?: string;
    example?: string;
    action?: ISFrontendCheckerCheckResultAction;
    moreLink?: string;
}

export interface ISFrontendCheckerCheckFn {
    ($context: HTMLElement): Promise<ISFrontendCheckerCheckResult>;
}

export default class SFrontendCheckeer extends __SClass {
    /**
     * Store the registered checks
     */
    static _registeredChecks: { [key: string]: ISFrontendCheckerCheckFn } = {};

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
    static registerCheck(checkObj: ISFrontendCheckerCheckObj) {
        this._registeredChecks[checkObj.id] = checkObj;
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

    /**
     * @name          check
     * @type          Function
     * @constructor
     *
     * Check the passed context and returns some insights about what is good and what's not.
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    check(
        $context = document,
        checks = Object.keys(SFrontendCheckeer._registeredChecks),
    ) {
        const results: ISFrontendCheckerCheckResult[] = [];
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            for (let i = 0; i < checks.length; i++) {
                const checkId = checks[i];
                const checkObj = SFrontendCheckeer._registeredChecks[checkId];
                const checkResult = await checkObj.check({ $context });
                const checkResultObj = Object.assign({}, checkObj);
                delete checkResultObj.check;
                checkResultObj.result = checkResult;
                emit('check', checkResultObj);
                results.push(checkResultObj);
            }
            resolve(results);
        });
    }
}

// register default checks
SFrontendCheckeer.registerCheck(__doctype);
SFrontendCheckeer.registerCheck(__charset);
SFrontendCheckeer.registerCheck(__viewport);
SFrontendCheckeer.registerCheck(__title);
SFrontendCheckeer.registerCheck(__description);
SFrontendCheckeer.registerCheck(__keywords);
SFrontendCheckeer.registerCheck(__author);
SFrontendCheckeer.registerCheck(__direction);
SFrontendCheckeer.registerCheck(__language);
SFrontendCheckeer.registerCheck(__cssOrder);
SFrontendCheckeer.registerCheck(__opengraph);
SFrontendCheckeer.registerCheck(__twitterCard);
SFrontendCheckeer.registerCheck(__noopener);
SFrontendCheckeer.registerCheck(__comments);
SFrontendCheckeer.registerCheck(__w3c);
SFrontendCheckeer.registerCheck(__printStylesheet);
SFrontendCheckeer.registerCheck(__uniqueIds);
SFrontendCheckeer.registerCheck(__webpImages);
SFrontendCheckeer.registerCheck(__imagesAlt);
