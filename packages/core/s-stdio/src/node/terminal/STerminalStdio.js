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
const inquirer_1 = __importDefault(require("inquirer"));
// import __SNotification from '../../notification/SNotification';
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SStdio_1 = __importDefault(require("../../shared/SStdio"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
class STerminalStdio extends SStdio_1.default {
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
        super(sources, deepMerge_1.default({
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
                        const res = yield inquirer_1.default.prompt(Object.assign(Object.assign({}, askObj), { type: 'confirm', name: 'value' }));
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
                const idStr = `<bg${upperFirst_1.default(logObj.metas.emitter.metas.color || 'yellow')}> </bg${upperFirst_1.default(logObj.metas.emitter.metas.color || 'yellow')}><${logObj.metas.emitter.metas.color || 'yellow'}> ${logObj.metas.emitter.metas.id} │ </${logObj.metas.emitter.metas.color || 'yellow'}>`;
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
            console.log(parseHtml_1.default(renderedStr));
        }
        catch (e) { }
    }
}
const defaultTerminalStdioComponent_1 = __importDefault(require("./components/defaultTerminalStdioComponent"));
const errorTerminalStdioComponent_1 = __importDefault(require("./components/errorTerminalStdioComponent"));
const fileTerminalStdioComponent_1 = __importDefault(require("./components/fileTerminalStdioComponent"));
const headingTerminalStdioComponent_1 = __importDefault(require("./components/headingTerminalStdioComponent"));
const separatorTerminalStdioComponent_1 = __importDefault(require("./components/separatorTerminalStdioComponent"));
const timeTerminalStdioComponent_1 = __importDefault(require("./components/timeTerminalStdioComponent"));
const warningTerminalStdioComponent_1 = __importDefault(require("./components/warningTerminalStdioComponent"));
STerminalStdio.registerComponent(defaultTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(separatorTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(headingTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(errorTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(fileTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(warningTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(timeTerminalStdioComponent_1.default);
exports.default = STerminalStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBa0U7QUFDbEUsNEZBQXNFO0FBQ3RFLGlFQUEyQztBQUMzQyw4RkFBd0U7QUFDeEUsNkZBQXVFO0FBa0N2RSxNQUFNLGNBQWUsU0FBUSxnQkFBUTtJQUNuQyxNQUFNO0lBQ04sMEJBQTBCO0lBQzFCLDhCQUE4QjtJQUM5QixjQUFjO0lBQ2QsS0FBSztJQUNMLHlEQUF5RDtJQUN6RCxLQUFLO0lBQ0wsc0JBQXNCO0lBQ3RCLHNGQUFzRjtJQUN0RixNQUFNO0lBQ04sOEJBQThCO0lBRTlCOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3ZCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsT0FBMEMsRUFDMUMsUUFBcUM7UUFFckMsS0FBSyxDQUNILE9BQU8sRUFDUCxtQkFBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2dCQUNYLFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLHlDQUF5QztRQUN6Qyx1QkFBdUI7UUFDdkIsTUFBTTtRQUNOLHFDQUFxQztRQUNyQyw0REFBNEQ7UUFDNUQsOENBQThDO1FBQzlDLFFBQVE7UUFDUixNQUFNO1FBRU4sY0FBYztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBTyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLFFBQVEsTUFBTSxDQUFD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