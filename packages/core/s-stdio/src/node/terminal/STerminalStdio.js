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
const terminal_kit_1 = require("terminal-kit");
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
        terminal_kit_1.terminal.previousLine();
        terminal_kit_1.terminal.eraseLine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBa0U7QUFDbEUsNEZBQXNFO0FBQ3RFLGlFQUEyQztBQUMzQyw4RkFBd0U7QUFDeEUsNkZBQXVFO0FBQ3ZFLCtDQUF5RDtBQWlDekQsTUFBTSxjQUFlLFNBQVEsZ0JBQVE7SUFDbkMsTUFBTTtJQUNOLDBCQUEwQjtJQUMxQiw4QkFBOEI7SUFDOUIsY0FBYztJQUNkLEtBQUs7SUFDTCx5REFBeUQ7SUFDekQsS0FBSztJQUNMLHNCQUFzQjtJQUN0QixzRkFBc0Y7SUFDdEYsTUFBTTtJQUNOLDhCQUE4QjtJQUU5Qjs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjtRQUN2QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFFBQXFDO1FBRXJDLEtBQUssQ0FDSCxPQUFPLEVBQ1AsbUJBQVcsQ0FDVDtZQUNFLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsSUFBSTtnQkFDWCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRix5Q0FBeUM7UUFDekMsdUJBQXVCO1FBQ3ZCLE1BQU07UUFDTixxQ0FBcUM7UUFDckMsNERBQTREO1FBQzVELDhDQUE4QztRQUM5QyxRQUFRO1FBQ1IsTUFBTTtRQUVOLGNBQWM7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQU8sTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxR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