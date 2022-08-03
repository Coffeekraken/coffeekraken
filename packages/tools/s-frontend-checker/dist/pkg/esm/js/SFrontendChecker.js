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
export default class SFrontendCheckeer extends __SClass {
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
    static registerCheck(checkObj) {
        this._registeredChecks[checkObj.id] = checkObj;
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
    check($context = document, checks = Object.keys(SFrontendCheckeer._registeredChecks)) {
        const results = [];
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < checks.length; i++) {
                const checkId = checks[i];
                const checkObj = SFrontendCheckeer._registeredChecks[checkId];
                const checkResult = yield checkObj.check({ $context });
                const checkResultObj = Object.assign({}, checkObj);
                delete checkResultObj.check;
                checkResultObj.result = checkResult;
                emit('check', checkResultObj);
                results.push(checkResultObj);
            }
            resolve(results);
        }));
    }
}
/**
 * Store the registered checks
 */
SFrontendCheckeer._registeredChecks = {};
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
SFrontendCheckeer.LEVEL_LOW = 0;
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
SFrontendCheckeer.LEVEL_MEDIUM = 1;
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
SFrontendCheckeer.LEVEL_HIGH = 2;
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
SFrontendCheckeer.STATUS_SUCCESS = 'success';
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
SFrontendCheckeer.STATUS_WARNING = 'warning';
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
SFrontendCheckeer.STATUS_ERROR = 'error';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBRWhHLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sV0FBVyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxhQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBK0QvQyxNQUFNLENBQUMsT0FBTyxPQUFP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