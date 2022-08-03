"use strict";
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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SStdio_1 = __importDefault(require("../../shared/SStdio"));
const defaultWebSocketComponent_1 = __importDefault(require("./components/defaultWebSocketComponent"));
class SWebsocketStdio extends SStdio_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(id, sources, settings) {
        super(id, sources, (0, deepMerge_1.default)({}, settings || {}));
    }
    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _log(logObj, component) {
        // handle empty logs
        if (!logObj)
            return;
        const obj = component.render(logObj);
    }
    /**
     * @name          _ask
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILogAsk}        askObj            The ask object to ask to the user
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _ask(askObj) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let prompt, res;
            // switch (askObj.type) {
            //     case 'select':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Select))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'autocomplete':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.AutoComplete))({
            //             ...askObj,
            //             color: groupObj.color,
            //             choices: askObj.choices,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'confirm':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Confirm))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'form':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Form))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'input':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Input))({
            //             ...askObj,
            //             color: groupObj.color,
            //             validate(value) {
            //                 if (!askObj.pattern) return true;
            //                 const pattern = Array.isArray(askObj.pattern) ? askObj.pattern : [askObj.pattern];
            //                 const reg = new RegExp(pattern[0], pattern[1]);
            //                 return reg.test(value);
            //             }
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'secret':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Secret))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'list':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.List))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'multiselect':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.MultiSelect))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'number':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.NumberPrompt))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'password':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Password))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'toggle':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Toggle))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     default:
            //         throw new Error(`Unknown ask type ${askObj.type}`);
            //         break;
            // }
            resolve(res);
        }));
    }
}
SWebsocketStdio.registerComponent(defaultWebSocketComponent_1.default);
exports.default = SWebsocketStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsd0VBQWlEO0FBQ2pELDRGQUFzRTtBQUN0RSxpRUFBMkM7QUFDM0MsdUdBQWlGO0FBNEJqRixNQUFNLGVBQWdCLFNBQVEsZ0JBQVE7SUFDbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsUUFBbUM7UUFFbkMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBQSxtQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLE1BQWEsRUFBRSxTQUFTO1FBQ3pCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDcEIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLE1BQU07UUFDUCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RELElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQztZQUVoQix5QkFBeUI7WUFDekIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QiwyRUFBMkU7WUFDM0UseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxjQUFjO1lBQ2Qsb0NBQW9DO1lBQ3BDLGlCQUFpQjtZQUNqQiwyQkFBMkI7WUFDM0Isd0JBQXdCO1lBQ3hCLGlGQUFpRjtZQUNqRix5QkFBeUI7WUFDekIscUNBQXFDO1lBQ3JDLHVDQUF1QztZQUN2QyxjQUFjO1lBQ2Qsb0NBQW9DO1lBQ3BDLGlCQUFpQjtZQUNqQixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDRFQUE0RTtZQUM1RSx5QkFBeUI7WUFDekIscUNBQXFDO1lBQ3JDLGNBQWM7WUFDZCxvQ0FBb0M7WUFDcEMsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQix3QkFBd0I7WUFDeEIseUVBQXlFO1lBQ3pFLHlCQUF5QjtZQUN6QixxQ0FBcUM7WUFDckMsY0FBYztZQUNkLG9DQUFvQztZQUNwQyxpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLHdCQUF3QjtZQUN4QiwwRUFBMEU7WUFDMUUseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxnQ0FBZ0M7WUFDaEMsb0RBQW9EO1lBQ3BELHFHQUFxRztZQUNyRyxrRUFBa0U7WUFDbEUsMENBQTBDO1lBQzFDLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2Qsb0NBQW9DO1lBQ3BDLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLDJFQUEyRTtZQUMzRSx5QkFBeUI7WUFDekIscUNBQXFDO1lBQ3JDLGNBQWM7WUFDZCxvQ0FBb0M7WUFDcEMsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQix3QkFBd0I7WUFDeEIseUVBQXlFO1lBQ3pFLHlCQUF5QjtZQUN6QixxQ0FBcUM7WUFDckMsY0FBYztZQUNkLG9DQUFvQztZQUNwQyxpQkFBaUI7WUFDakIsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4QixnRkFBZ0Y7WUFDaEYseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxjQUFjO1lBQ2Qsb0NBQW9DO1lBQ3BDLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLGlGQUFpRjtZQUNqRix5QkFBeUI7WUFDekIscUNBQXFDO1lBQ3JDLGNBQWM7WUFDZCxvQ0FBb0M7WUFDcEMsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2Qix3QkFBd0I7WUFDeEIsNkVBQTZFO1lBQzdFLHlCQUF5QjtZQUN6QixxQ0FBcUM7WUFDckMsY0FBYztZQUNkLG9DQUFvQztZQUNwQyxpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QiwyRUFBMkU7WUFDM0UseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxjQUFjO1lBQ2Qsb0NBQW9DO1lBQ3BDLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsOERBQThEO1lBQzlELGlCQUFpQjtZQUNqQixJQUFJO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFRCxlQUFlLENBQUMsaUJBQWlCLENBQUMsbUNBQTJCLENBQUMsQ0FBQztBQUUvRCxrQkFBZSxlQUFlLENBQUMifQ==