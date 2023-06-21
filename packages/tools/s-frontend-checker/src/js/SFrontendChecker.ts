// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontendCheckerSettingsInterface from './interface/SFrontendCheckerSettingsInterface';

import __ariaBanner from './checks/ariaBanner';
import __ariaButtonLabel from './checks/ariaButtonLabel';
import __ariaComplmentary from './checks/ariaComplementary';
import __ariaContentInfo from './checks/ariaContentInfo';
import __ariaDescribedBy from './checks/ariaDescribedBy';
import __ariaFigureFigcaption from './checks/ariaFigureFigcaption';
import __ariaForm from './checks/ariaForm';
import __ariaLabelledBy from './checks/ariaLabelledBy';
import __ariaMain from './checks/ariaMain';
import __ariaRoles from './checks/ariaRoles';
import __ariaSearch from './checks/ariaSearch';
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

import __ariaTableCaption from './checks/ariaTableCaption';

import __ariaFieldsetLegend from './checks/ariaFieldsetLegend';

import __ariaLabelForm from './checks/ariaLabelForm';

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

export interface ISFrontendCheckerSettings {}

export interface ISFrontendCheckerCheckObj {
    id: string;
    name: string;
    description: string;
    level: number;
    check: Function;
    result?: ISFrontendCheckerCheckResult;
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

export default class SFrontendChecker extends __SClass {
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
        checks = Object.keys(SFrontendChecker._registeredChecks),
    ) {
        const checksObjects: Record<string, ISFrontendCheckerCheckObj> = {};
        checks.forEach((checkId) => {
            if (!SFrontendChecker._registeredChecks[checkId]) {
                throw new Error(
                    `[SFrontendChecker] The requested "${checkId}" does not exists...`,
                );
            }
            checksObjects[checkId] = __clone(
                SFrontendChecker._registeredChecks[checkId],
                {
                    deep: true,
                },
            );
        });

        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            emit('checks.start', checksObjects);
            for (let i = 0; i < checks.length; i++) {
                const checkId = checks[i];
                const checkObj = checksObjects[checkId];
                emit('check.start', checkObj);
                const checkResult = await checkObj.check({ $context });
                delete checkObj.check;
                checkObj.result = checkResult;
                emit('check.complete', checkObj);
            }
            emit('checks.complete', checksObjects);
            resolve(checksObjects);
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
