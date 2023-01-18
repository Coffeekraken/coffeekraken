"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const SStdioSource_1 = __importDefault(require("../SStdioSource"));
class SStdioEventEmitterSource extends SStdioSource_1.default {
    constructor(eventEmitter, settings) {
        super(settings);
        this._tmpPrintedLogs = [];
        // save the emitter
        this._emitter = eventEmitter;
        // listen for logs
        this._emitter.on('log', (logObj, metas) => {
            var _a, _b;
            // @TODO        find why some logs are printed x times... It seems that it's linked to number of actions theirs in a recipe in the SKitchen class...
            if (this._tmpPrintedLogs.includes(logObj.value)) {
                return;
            }
            this._tmpPrintedLogs.push(logObj.value);
            setTimeout(() => {
                this._tmpPrintedLogs.splice(this._tmpPrintedLogs.indexOf(logObj.value), 1);
            }, 100);
            if (logObj === undefined || logObj === null)
                return;
            // save metas into logObj
            logObj.metas = metas;
            if (!logObj.group) {
                // @ts-ignore
                if (((_a = logObj.metas) === null || _a === void 0 ? void 0 : _a.id) === 'SPromise') {
                    logObj.group = 'Global';
                }
                else {
                    // @ts-ignore
                    logObj.group = (_b = logObj.metas.id) !== null && _b !== void 0 ? _b : '';
                }
            }
            this.log(new s_log_1.default(logObj));
        });
        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }
}
exports.default = SStdioEventEmitterSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQXlDO0FBRXpDLG1FQUE2QztBQVE3QyxNQUFxQix3QkFBeUIsU0FBUSxzQkFBYztJQU1oRSxZQUFZLFlBQTZCLEVBQUUsUUFBcUQ7UUFDNUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSHBCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBS2pCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUU3QixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBYSxFQUFFLEtBQVUsRUFBRSxFQUFFOztZQUVsRCxvSkFBb0o7WUFDcEosSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQzFDLENBQUMsQ0FDSixDQUFDO1lBQ04sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJO2dCQUFFLE9BQU87WUFFcEQseUJBQXlCO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXJCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNmLGFBQWE7Z0JBQ2IsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsRUFBRSxNQUFLLFVBQVUsRUFBRTtvQkFDakMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7aUJBQzNCO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUM7aUJBQ3hDO2FBQ0o7WUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksZUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlO1FBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0NBRUo7QUFwREQsMkNBb0RDIn0=