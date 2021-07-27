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
import __SStdio from '../../shared/SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
import __splitEvery from '@coffeekraken/sugar/shared/string/splitEvery';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
class STerminalStdio extends __SStdio {
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
    constructor(sources, settings) {
        super(sources, __deepMerge({
            terminalStdio: {
                icons: true
            }
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
        this.display();
    }
    /**
     * @name      terminalStdioSettings
     * @type      ISTerminalStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get terminalStdioSettings() {
        return this._settings.terminalStdio;
    }
    clearLast() {
        // __terminalKit.previousLine();
        // __terminalKit.eraseLine();
    }
    clear() {
        process.stdout.write('\x1Bc');
    }
    _log(logObj, component) {
        var _a;
        // handle empty logs
        if (!logObj)
            return;
        if (!logObj.decorators) {
            console.log(__parseHtml(logObj.value));
            return;
        }
        let needId = false;
        if (this._currentLogId !== logObj.metas.emitter.metas.id) {
            needId = true;
            this._currentLogId = logObj.metas.emitter.metas.id;
        }
        let lineStart = '', idStr = '', idSeparator = '';
        // render the component
        let renderedStr = component.render(logObj, this._settings);
        // handle metas if needed
        if (!logObj.nude) {
            if ((_a = logObj.metas) === null || _a === void 0 ? void 0 : _a.emitter) {
                lineStart = `<bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}> </bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}>`;
                idStr = `<${logObj.metas.emitter.metas.color || 'yellow'}> ${logObj.metas.emitter.metas.id}</${logObj.metas.emitter.metas.color || 'yellow'}>`;
                idSeparator = `<${logObj.metas.emitter.metas.color || 'yellow'}> │ </${logObj.metas.emitter.metas.color || 'yellow'}>`;
            }
        }
        if (logObj.marginTop && typeof logObj.marginTop === 'number') {
            renderedStr = '\n'.repeat(logObj.marginTop) + renderedStr;
        }
        if (logObj.marginBottom && typeof logObj.marginBottom === 'number') {
            renderedStr = renderedStr + '\n'.repeat(logObj.marginBottom);
        }
        if (needId) {
            console.log(__parseHtml(lineStart));
        }
        let lines = renderedStr.split('\n');
        const idLength = __countLine(__parseHtml(idStr)), idSeparatorLength = __countLine(__parseHtml(idSeparator)), lineStartLength = __countLine(__parseHtml(lineStart));
        const maxLineLenght = process.stdout.columns - idLength - idSeparatorLength - lineStartLength;
        let finalLines = [];
        lines.forEach((line, i) => {
            if (line.includes('-%-')) {
                finalLines.push(line.replace('-%-', '-'.repeat(maxLineLenght)));
            }
            else if (__countLine(line) > maxLineLenght) {
                __splitEvery(line, maxLineLenght).forEach((l, j) => {
                    finalLines.push(l.trim());
                });
            }
            else {
                finalLines.push(line.trim());
            }
        });
        finalLines = finalLines.map(line => {
            if (needId) {
                needId = false;
                return `${lineStart}${idStr}${idSeparator}${line.trim()}`;
            }
            else {
                return `${lineStart}${' '.repeat(idLength)}${idSeparator}${line.trim()}`;
            }
        });
        // log the string
        try {
            console.log(__parseHtml(finalLines.join('\n')));
        }
        catch (e) { }
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
import __defaultTerminalStdioComponent from './components/defaultTerminalStdioComponent';
import __errorTerminalStdioComponent from './components/errorTerminalStdioComponent';
import __fileTerminalStdioComponent from './components/fileTerminalStdioComponent';
import __headingTerminalStdioComponent from './components/headingTerminalStdioComponent';
import __separatorTerminalStdioComponent from './components/separatorTerminalStdioComponent';
import __timeTerminalStdioComponent from './components/timeTerminalStdioComponent';
import __warningTerminalStdioComponent from './components/warningTerminalStdioComponent';
STerminalStdio.registerComponent(__defaultTerminalStdioComponent);
STerminalStdio.registerComponent(__separatorTerminalStdioComponent);
STerminalStdio.registerComponent(__headingTerminalStdioComponent);
STerminalStdio.registerComponent(__errorTerminalStdioComponent);
STerminalStdio.registerComponent(__fileTerminalStdioComponent);
STerminalStdio.registerComponent(__warningTerminalStdioComponent);
STerminalStdio.registerComponent(__timeTerminalStdioComponent);
export default STerminalStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxrRUFBa0U7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUE2QixNQUFNLHFCQUFxQixDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBRXZFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBK0J2QyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBZ0JuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFFBQXFDO1FBRXJDLEtBQUssQ0FDSCxPQUFPLEVBQ1AsV0FBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBY0o7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUF6QmpCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBekNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3ZCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQStCRCxTQUFTO1FBQ1AsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFnQkQsSUFBSSxD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