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
class STerminalStdio extends __SStdio {
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
    clearLast() {
        // __terminalKit.previousLine();
        // __terminalKit.eraseLine();
    }
    clear() {
        process.stdout.write('\x1Bc');
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _log(logObj, component) {
        var _a;
        // handle empty logs
        if (!logObj)
            return;
        // __terminalKit.saveCursor();
        // render the component
        let renderedStr = component.render(logObj, this._settings);
        // handle metas if needed
        if (!logObj.nude) {
            if (this.terminalStdioSettings.metas && ((_a = logObj.metas) === null || _a === void 0 ? void 0 : _a.emitter)) {
                const idStr = `<bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}> </bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}><${logObj.metas.emitter.metas.color || 'yellow'}> ${logObj.metas.emitter.metas.id} │ </${logObj.metas.emitter.metas.color || 'yellow'}>`;
                renderedStr = `${idStr}${renderedStr}`;
            }
        }
        if (logObj.marginTop && typeof logObj.marginTop === 'number') {
            renderedStr = '\n'.repeat(logObj.marginTop) + renderedStr;
        }
        if (logObj.marginBottom && typeof logObj.marginBottom === 'number') {
            renderedStr = renderedStr + '\n'.repeat(logObj.marginBottom);
        }
        // log the string
        try {
            console.log(__parseHtml(renderedStr));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFFbEMsa0VBQWtFO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBa0N2RSxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBQ25DLE1BQU07SUFDTiwwQkFBMEI7SUFDMUIsOEJBQThCO0lBQzlCLGNBQWM7SUFDZCxLQUFLO0lBQ0wseURBQXlEO0lBQ3pELEtBQUs7SUFDTCxzQkFBc0I7SUFDdEIsc0ZBQXNGO0lBQ3RGLE1BQU07SUFDTiw4QkFBOEI7SUFFOUI7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxxQkFBcUI7UUFDdkIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxPQUEwQyxFQUMxQyxRQUFxQztRQUVyQyxLQUFLLENBQ0gsT0FBTyxFQUNQLFdBQVcsQ0FDVDtZQUNFLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsSUFBSTtnQkFDWCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRix5Q0FBeUM7UUFDekMsdUJBQXVCO1FBQ3ZCLE1BQU07UUFDTixxQ0FBcUM7UUFDckMsNERBQTREO1FBQzVELDhDQUE4QztRQUM5QyxRQUFRO1FBQ1IsTUFBTTtRQUVOLGNBQWM7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxF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