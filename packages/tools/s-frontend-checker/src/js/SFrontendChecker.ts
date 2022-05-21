// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';
import __SPromise from '@coffeekraken/s-promise';

import __doctype from './checks/doctype';
import __charset from './checks/charset';
import __viewport from './checks/viewport';
import __title from './checks/title';
import __description from './checks/description';
import __keywords from './checks/keywords';
import __author from './checks/author';

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

export interface ISFrontendCheckerCtorSettings {
    frontendChecker: Partial<ISFrontendCheckerSettings>;
}
export interface ISFrontendCheckerSettings {}

export interface ISFrontendCheckerCheckResult {
    name: string;
    description: string;
    status: 'success' | 'warning' | 'error';
    message?: string;
    example?: string;
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
    static registerCheck(checkFn: ISFrontendCheckerCheckFn) {
        this._registeredChecks[checkFn.name] = checkFn;
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
    constructor(settings: Partial<ISFrontendCheckerCtorSettings> = {}) {
        super(
            __deepMerge(
                {
                    frontendChecker: __SFrontendCheckerSettingsInterface.defaults(),
                },
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
                const checkFn = SFrontendCheckeer._registeredChecks[checkId];
                const checkResult = await checkFn($context);
                emit('check', checkResult);
                results.push(checkResult);
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
