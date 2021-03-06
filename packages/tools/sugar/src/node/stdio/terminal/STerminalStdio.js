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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SStdio_1 = __importDefault(require("../SStdio"));
const SNotification_1 = __importDefault(require("../../notification/SNotification"));
const inquirer_1 = __importDefault(require("inquirer"));
class STerminalStdio extends SStdio_1.default {
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
                actionPrefix: true,
                icons: true
            }
        }, settings || {}));
        this._notifier = new SNotification_1.default({
            adapters: ['node']
        });
        this.sources.forEach((source) => {
            source.on('notification', (notificationObj, metas) => {
                this._notifier.notify(notificationObj);
            });
        });
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
    clear() {
        process.stdout.write('\x1Bc');
        // console.log('clearing to be implemented');
    }
    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _log(logObj, component) {
        console.log(component.render(logObj, this._settings));
    }
}
const defaultTerminalStdioComponent_1 = __importDefault(require("./components/defaultTerminalStdioComponent"));
const headingTerminalStdioComponent_1 = __importDefault(require("./components/headingTerminalStdioComponent"));
const separatorTerminalStdioComponent_1 = __importDefault(require("./components/separatorTerminalStdioComponent"));
const errorTerminalStdioComponent_1 = __importDefault(require("./components/errorTerminalStdioComponent"));
const fileTerminalStdioComponent_1 = __importDefault(require("./components/fileTerminalStdioComponent"));
const warningTerminalStdioComponent_1 = __importDefault(require("./components/warningTerminalStdioComponent"));
const timeTerminalStdioComponent_1 = __importDefault(require("./components/timeTerminalStdioComponent"));
STerminalStdio.registerComponent(defaultTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(separatorTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(headingTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(errorTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(fileTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(warningTerminalStdioComponent_1.default);
STerminalStdio.registerComponent(timeTerminalStdioComponent_1.default);
exports.default = STerminalStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFpRDtBQUNqRCx1REFBaUM7QUFDakMscUZBQStEO0FBRS9ELHdEQUFrQztBQWdDbEMsTUFBTSxjQUFlLFNBQVEsZ0JBQVE7SUEyQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsT0FBMEMsRUFDMUMsUUFBcUM7UUFFckMsS0FBSyxDQUNILE9BQU8sRUFDUCxtQkFBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFO2dCQUNiLFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx1QkFBZSxDQUFDO1lBQ25DLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsY0FBYztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBTyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDakMsS0FBSyxTQUFTO3dCQUNaLE1BQU0sR0FBRyxHQUFHLE1BQU0sa0JBQVUsQ0FBQyxNQUFNLGlDQUM5QixNQUFNLEtBQ1QsSUFBSSxFQUFFLFNBQVMsRUFDZixJQUFJLEVBQUUsT0FBTyxJQUNiLENBQUM7d0JBQ0gsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO3dCQUNqQixNQUFNO2lCQUNUO1lBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFuRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxxQkFBcUI7UUFDdkIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBeURELEtBQUs7UUFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5Qiw2Q0FBNkM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQUVELCtHQUF5RjtBQUN6RiwrR0FBeUY7QUFDekYsbUhBQTZGO0FBQzdGLDJHQUFxRjtBQUNyRix5R0FBbUY7QUFDbkYsK0dBQXlGO0FBQ3pGLHlHQUFtRjtBQUVuRixjQUFjLENBQUMsaUJBQWlCLENBQUMsdUNBQStCLENBQUMsQ0FBQztBQUNsRSxjQUFjLENBQUMsaUJBQWlCLENBQUMseUNBQWlDLENBQUMsQ0FBQztBQUNwRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsdUNBQStCLENBQUMsQ0FBQztBQUNsRSxjQUFjLENBQUMsaUJBQWlCLENBQUMscUNBQTZCLENBQUMsQ0FBQztBQUNoRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsb0NBQTRCLENBQUMsQ0FBQztBQUMvRCxjQUFjLENBQUMsaUJBQWlCLENBQUMsdUNBQStCLENBQUMsQ0FBQztBQUNsRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsb0NBQTRCLENBQUMsQ0FBQztBQUUvRCxrQkFBZSxjQUFjLENBQUMifQ==