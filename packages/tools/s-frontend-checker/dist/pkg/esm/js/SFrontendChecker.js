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
    check($context = document, checks = Object.keys(SFrontendChecker._registeredChecks)) {
        const checksObjects = {};
        checks.forEach((checkId) => {
            if (!SFrontendChecker._registeredChecks[checkId]) {
                throw new Error(`[SFrontendChecker] The requested "${checkId}" does not exists...`);
            }
            checksObjects[checkId] = __clone(SFrontendChecker._registeredChecks[checkId], {
                deep: true,
            });
        });
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('checks.start', checksObjects);
            for (let i = 0; i < checks.length; i++) {
                const checkId = checks[i];
                const checkObj = checksObjects[checkId];
                emit('check.start', checkObj);
                const checkResult = yield checkObj.check({ $context });
                delete checkObj.check;
                checkObj.result = checkResult;
                emit('check.complete', checkObj);
            }
            emit('checks.complete', checksObjects);
            resolve(checksObjects);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLGtCQUFrQixNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLHNCQUFzQixNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sZ0JBQWdCLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBQ25DLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLG9CQUFvQixD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