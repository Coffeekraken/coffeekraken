"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const SStdioSource_js_1 = __importDefault(require("../SStdioSource.js"));
class SStdioEventEmitterSource extends SStdioSource_js_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQXlDO0FBRXpDLHlFQUFnRDtBQU9oRCxNQUFxQix3QkFDakIsU0FBUSx5QkFBYztJQU90QixZQUNJLFlBQTZCLEVBQzdCLFFBQXFEO1FBRXJELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQU5wQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQVFqQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7UUFFN0Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQWEsRUFBRSxLQUFVLEVBQUUsRUFBRTs7WUFDbEQsb0pBQW9KO1lBQ3BKLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUMxQyxDQUFDLENBQ0osQ0FBQztZQUNOLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVSLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBRXBELHlCQUF5QjtZQUN6QixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUVyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDZixhQUFhO2dCQUNiLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLEVBQUUsTUFBSyxVQUFVLEVBQUU7b0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsbUNBQUksRUFBRSxDQUFDO2lCQUN4QzthQUNKO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKO0FBdkRELDJDQXVEQyJ9