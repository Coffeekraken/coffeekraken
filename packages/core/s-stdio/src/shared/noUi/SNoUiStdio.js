var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio from '../SStdio';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
class SNoUiStdio extends __SStdio {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge({
            noUiStdio: {},
        }, settings || {}));
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentLogId = '';
        this._logsStack = [];
        this.display();
    }
    /**
     * @name      noUiStdioSettings
     * @type      ISNoUiStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get noUiStdioSettings() {
        return this._settings.noUiStdio;
    }
    clearLast() {
        // __terminalKit.previousLine();
        // __terminalKit.eraseLine();
    }
    clear() {
        // this._currentLine = 0;
        // process.stdout.write('\x1Bc');
    }
    _log(logObj, component) {
        var _a, _b;
        // handle empty logs
        if (!logObj)
            return;
        if (logObj.clear) {
            process.stdout.moveCursor(0, -1); // up one line
            process.stdout.clearLine(1); // from cursor to end
        }
        if ((_a = logObj.margin) === null || _a === void 0 ? void 0 : _a.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                console.log(' ');
            }
        }
        console.log(__parseHtml(component.render(logObj, this.noUiStdioSettings)));
        if ((_b = logObj.margin) === null || _b === void 0 ? void 0 : _b.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                console.log(' ');
            }
        }
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _ask(askObj) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let prompt, res;
            switch (askObj.type) {
                case 'select':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Select(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new __Enquirer.default.AutoComplete(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Confirm(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Form(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Input(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'secret':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Secret(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new __Enquirer.default.List(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new __Enquirer.default.MultiSelect(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new __Enquirer.default.NumberPrompt(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Password(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Toggle(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
            }
            resolve(res);
        }));
    }
}
import __defaultNoUiStdioComponent from './components/defaultNoUiStdioComponent';
import __summaryNoUiStdioComponent from './components/summaryNoUiStdioComponent';
import __errorNoUiStdioComponent from './components/errorNoUiStdioComponent';
SNoUiStdio.registerComponent(__defaultNoUiStdioComponent);
SNoUiStdio.registerComponent(__summaryNoUiStdioComponent);
SNoUiStdio.registerComponent(__errorNoUiStdioComponent);
export default SNoUiStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vVWlTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb1VpU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsa0VBQWtFO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBNkIsTUFBTSxXQUFXLENBQUM7QUFFdEQsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFJdkUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFzQ3ZDLE1BQU0sVUFBVyxTQUFRLFFBQVE7SUFlN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsUUFBa0M7UUFFbEMsS0FBSyxDQUNELEVBQUUsRUFDRixPQUFPLEVBQ1AsV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLEVBQUU7U0FDaEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFlTjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixlQUFVLEdBQStCLEVBQUUsQ0FBQztRQTNCeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUF6Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxpQkFBaUI7UUFDakIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBK0JELFNBQVM7UUFDTCxnQ0FBZ0M7UUFDaEMsNkJBQTZCO0lBQ2pDLENBQUM7SUFFRCxLQUFLO1FBQ0QseUJBQXlCO1FBQ3pCLGlDQUFpQztJQUNyQyxDQUFDO0lBaUJELElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUzs7UUFDbEIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUVwQixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLENB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