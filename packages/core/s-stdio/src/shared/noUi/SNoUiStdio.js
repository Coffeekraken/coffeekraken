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
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
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
        const packageJson = __packageJson();
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
        this._currentLine = 0;
        process.stdout.write('\x1Bc');
    }
    _log(logObj, component) {
        // handle empty logs
        if (!logObj)
            return;
        console.log(component.render(logObj, this.noUiStdioSettings));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vVWlTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb1VpU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsa0VBQWtFO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBNkIsTUFBTSxXQUFXLENBQUM7QUFNdEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFNdkMsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFnQ3RFLE1BQU0sVUFBVyxTQUFRLFFBQVE7SUFlN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsUUFBa0M7UUFFbEMsS0FBSyxDQUNELEVBQUUsRUFDRixPQUFPLEVBQ1AsV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLEVBQUU7U0FDaEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFpQk47Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUErQixFQUFFLENBQUM7UUE3QnhDLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBM0NEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ2pCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDM0MsQ0FBQztJQWlDRCxTQUFTO1FBQ0wsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFpQkQsSUFBSSxDQUFDLE1BQU0s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