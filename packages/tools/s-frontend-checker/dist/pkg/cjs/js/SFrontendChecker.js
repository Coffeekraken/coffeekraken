"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SFrontendCheckerSettingsInterface_1 = __importDefault(require("./interface/SFrontendCheckerSettingsInterface"));
const author_1 = __importDefault(require("./checks/author"));
const charset_1 = __importDefault(require("./checks/charset"));
const comments_1 = __importDefault(require("./checks/comments"));
const cssOrder_1 = __importDefault(require("./checks/cssOrder"));
const description_1 = __importDefault(require("./checks/description"));
const direction_1 = __importDefault(require("./checks/direction"));
const doctype_1 = __importDefault(require("./checks/doctype"));
const imagesAlt_1 = __importDefault(require("./checks/imagesAlt"));
const keywords_1 = __importDefault(require("./checks/keywords"));
const language_1 = __importDefault(require("./checks/language"));
const noopener_1 = __importDefault(require("./checks/noopener"));
const opengraph_1 = __importDefault(require("./checks/opengraph"));
const printStylesheet_1 = __importDefault(require("./checks/printStylesheet"));
const title_1 = __importDefault(require("./checks/title"));
const twitterCard_1 = __importDefault(require("./checks/twitterCard"));
const uniqueIds_1 = __importDefault(require("./checks/uniqueIds"));
const viewport_1 = __importDefault(require("./checks/viewport"));
const w3c_1 = __importDefault(require("./checks/w3c"));
const webpImages_1 = __importDefault(require("./checks/webpImages"));
class SFrontendCheckeer extends s_class_1.default {
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
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SFrontendCheckerSettingsInterface_1.default.defaults(), settings));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = SFrontendCheckeer;
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
SFrontendCheckeer.registerCheck(doctype_1.default);
SFrontendCheckeer.registerCheck(charset_1.default);
SFrontendCheckeer.registerCheck(viewport_1.default);
SFrontendCheckeer.registerCheck(title_1.default);
SFrontendCheckeer.registerCheck(description_1.default);
SFrontendCheckeer.registerCheck(keywords_1.default);
SFrontendCheckeer.registerCheck(author_1.default);
SFrontendCheckeer.registerCheck(direction_1.default);
SFrontendCheckeer.registerCheck(language_1.default);
SFrontendCheckeer.registerCheck(cssOrder_1.default);
SFrontendCheckeer.registerCheck(opengraph_1.default);
SFrontendCheckeer.registerCheck(twitterCard_1.default);
SFrontendCheckeer.registerCheck(noopener_1.default);
SFrontendCheckeer.registerCheck(comments_1.default);
SFrontendCheckeer.registerCheck(w3c_1.default);
SFrontendCheckeer.registerCheck(printStylesheet_1.default);
SFrontendCheckeer.registerCheck(uniqueIds_1.default);
SFrontendCheckeer.registerCheck(webpImages_1.default);
SFrontendCheckeer.registerCheck(imagesAlt_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFDakQsNEZBQXNFO0FBQ3RFLHNIQUFnRztBQUVoRyw2REFBdUM7QUFDdkMsK0RBQXlDO0FBQ3pDLGlFQUEyQztBQUMzQyxpRUFBMkM7QUFDM0MsdUVBQWlEO0FBQ2pELG1FQUE2QztBQUM3QywrREFBeUM7QUFDekMsbUVBQTZDO0FBQzdDLGlFQUEyQztBQUMzQyxpRUFBMkM7QUFDM0MsaUVBQTJDO0FBQzNDLG1FQUE2QztBQUM3QywrRUFBeUQ7QUFDekQsMkRBQXFDO0FBQ3JDLHVFQUFpRDtBQUNqRCxtRUFBNkM7QUFDN0MsaUVBQTJDO0FBQzNDLHVEQUFpQztBQUNqQyxxRUFBK0M7QUErRC9DLE1BQXFCLGlCQUFrQixTQUFRLGlCQUFRO0lBOEZuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQStDLEVBQUU7UUFDekQsS0FBSyxDQUNELElBQUEsbUJBQVc7UUFDUCxhQUFhO1FBQ2IsMkNBQW1DLENBQUMsUUFBUSxFQUFFLEVBQzlDLFFBQVEsQ0FDWCxDQUNKLENBQUM7SUFDTixDQUFDO0lBbENEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFtQztRQUNwRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNuRCxDQUFDO0lBc0JEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FDRCxRQUFRLEdBQUcsUUFBUSxFQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUV6RCxNQUFNLE9BQU8sR0FBbUMsRUFBRSxDQUFDO1FBQ25ELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVB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