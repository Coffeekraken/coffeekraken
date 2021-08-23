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
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge({
            terminalStdio: {
                icons: true,
            },
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
        var _a, _b, _c, _d, _e, _f, _g;
        // handle empty logs
        if (!logObj)
            return;
        if (!logObj.decorators) {
            console.log(__parseHtml(logObj.value));
            return;
        }
        let needId = false;
        if (((_c = (_b = (_a = logObj.metas) === null || _a === void 0 ? void 0 : _a.emitter) === null || _b === void 0 ? void 0 : _b.metas) === null || _c === void 0 ? void 0 : _c.id) && this._currentLogId !== ((_f = (_e = (_d = logObj.metas) === null || _d === void 0 ? void 0 : _d.emitter) === null || _e === void 0 ? void 0 : _e.metas) === null || _f === void 0 ? void 0 : _f.id)) {
            needId = true;
            this._currentLogId = logObj.metas.emitter.metas.id;
        }
        let lineStart = '', idStr = '', idSeparator = '';
        // render the component
        let renderedStr = component.render(logObj, this._settings);
        // handle metas if needed
        if (!logObj.nude) {
            if ((_g = logObj.metas) === null || _g === void 0 ? void 0 : _g.emitter) {
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
        finalLines = finalLines.map((line) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxrRUFBa0U7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUE2QixNQUFNLHFCQUFxQixDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBRXZFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBOEJ2QyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBZWpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLE9BQTBDLEVBQUUsUUFBcUM7UUFDckcsS0FBSyxDQUNELEVBQUUsRUFDRixPQUFPLEVBQ1AsV0FBVyxDQUNQO1lBQ0ksYUFBYSxFQUFFO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWNOOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBekJmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3JCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQTZCRCxTQUFTO1FBQ0wsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xD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