var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __inquirer from 'inquirer';
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio from '../../shared/SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
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
                metas: true,
                actionPrefix: true,
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
        // this._notifier = new __SNotification({
        //   adapters: ['node']
        // });
        // this.sources.forEach((source) => {
        //   source.on('notification', (notificationObj, metas) => {
        //     this._notifier.notify(notificationObj);
        //   });
        // });
        // "ask" event
        this.sources.forEach((source) => {
            source.on('ask', (askObj, metas) => __awaiter(this, void 0, void 0, function* () {
                switch (askObj.type.toLowerCase()) {
                    case 'boolean':
                        const res = yield __inquirer.prompt(Object.assign(Object.assign({}, askObj), { type: 'confirm', name: 'value' }));
                        return res.value;
                        break;
                }
            }));
        });
        this.display();
    }
    // /**
    //  * @name      _notifier
    //  * @type      SNotification
    //  * @private
    //  *
    //  * Store the SNotification instance used in this class
    //  *
    //  * @since     2.0.0
    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // _notifier: __SNotification;
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
        // __terminalKit.saveCursor();
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
            if (this.terminalStdioSettings.metas && ((_a = logObj.metas) === null || _a === void 0 ? void 0 : _a.emitter)) {
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
        // const firstStr = lines[0];
        // const idPart = firstStr.split('│')[0];
        const idLength = __countLine(__parseHtml(idStr));
        lines = lines.map((line, i) => {
            if (needId)
                return `${lineStart}${idStr}${idSeparator}${line.trim()}`;
            return `${lineStart}${' '.repeat(idLength)}${idSeparator}${line.trim()}`;
        });
        // log the string
        try {
            console.log(__parseHtml(lines.join('\n')));
        }
        catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFFbEMsa0VBQWtFO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBRXZFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBaUN0RSxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBMkJuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFFBQXFDO1FBRXJDLEtBQUssQ0FDSCxPQUFPLEVBQ1AsV0FBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2dCQUNYLFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXVDSjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQWxEakIseUNBQXlDO1FBQ3pDLHVCQUF1QjtRQUN2QixNQUFNO1FBQ04scUNBQXFDO1FBQ3JDLDREQUE0RDtRQUM1RCw4Q0FBOEM7UUFDOUMsUUFBUTtRQUNSLE1BQU07UUFFTixjQUFjO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFPLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsUUFBUSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNqQyxLQUFLLFNB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