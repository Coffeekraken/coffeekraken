"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SStdio_1 = __importDefault(require("../SStdio"));
const SNotification_1 = __importDefault(require("../../notification/SNotification"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVFQUFpRDtBQUNqRCx1REFBaUM7QUFDakMscUZBQStEO0FBZ0MvRCxNQUFNLGNBQWUsU0FBUSxnQkFBUTtJQTJCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxPQUEwQyxFQUMxQyxRQUFxQztRQUVyQyxLQUFLLENBQ0gsT0FBTyxFQUNQLG1CQUFXLENBQ1Q7WUFDRSxhQUFhLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVCQUFlLENBQUM7WUFDbkMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ25CLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQW5ERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjtRQUN2QixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUF5Q0QsS0FBSztRQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLDZDQUE2QztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBRUQsK0dBQXlGO0FBQ3pGLCtHQUF5RjtBQUN6RixtSEFBNkY7QUFDN0YsMkdBQXFGO0FBQ3JGLHlHQUFtRjtBQUNuRiwrR0FBeUY7QUFDekYseUdBQW1GO0FBRW5GLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBK0IsQ0FBQyxDQUFDO0FBQ2xFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyx5Q0FBaUMsQ0FBQyxDQUFDO0FBQ3BFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBK0IsQ0FBQyxDQUFDO0FBQ2xFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxxQ0FBNkIsQ0FBQyxDQUFDO0FBQ2hFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxvQ0FBNEIsQ0FBQyxDQUFDO0FBQy9ELGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBK0IsQ0FBQyxDQUFDO0FBQ2xFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxvQ0FBNEIsQ0FBQyxDQUFDO0FBRS9ELGtCQUFlLGNBQWMsQ0FBQyJ9