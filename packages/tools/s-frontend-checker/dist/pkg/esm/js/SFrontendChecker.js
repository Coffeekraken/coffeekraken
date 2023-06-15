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
    static registerCheck(checkObj) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUF3RC9D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