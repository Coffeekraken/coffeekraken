var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SStdioSource from '../SStdioSource';
const _nativeLog = console.log;
export default class SStdioConsoleSource extends __SStdioSource {
    constructor(settings) {
        var _a;
        super(settings);
        this._tmpPrintedLogs = [];
        const nativeConsole = {};
        for (let key of ['log', 'error', 'warn', 'verbose']) {
            nativeConsole[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : nativeConsole.log;
            console[key] = (...args) => {
                var _a;
                const e = new Error();
                const stack = e.stack
                    .toString()
                    .split('\n')
                    .slice(2)
                    .map((str) => str.trim());
                const callerStr = (_a = stack[0]) !== null && _a !== void 0 ? _a : '';
                let group = callerStr
                    .split(' ')[callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                if (group === 'Timeout') {
                    group = stack[1]
                        .split(' ')[callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                }
                if (group.match(`^file:\/\/\/`)) {
                    group = group.trim().split('/').pop();
                }
                args = args.map((log) => {
                    var _a, _b;
                    if (!log)
                        return;
                    return new __SLog({
                        type: __SLog[`TYPE_${key.toUpperCase()}`],
                        value: (_a = log.value) !== null && _a !== void 0 ? _a : log,
                        group: (_b = log.group) !== null && _b !== void 0 ? _b : group,
                        // @ts-ignore
                        logger: nativeConsole[key],
                    });
                });
                args.forEach((log) => {
                    this.log(log);
                });
            };
        }
        // @ts-ignore
        console.ask = (askObj) => __awaiter(this, void 0, void 0, function* () {
            return yield this.ask(askObj);
        });
        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBTTdDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFDakIsU0FBUSxjQUFjO0lBS3RCLFlBQVksUUFBZ0Q7O1FBQ3hELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhwQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUtqQixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1lBQ2pELGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQztZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFOztnQkFDdkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUs7cUJBQ2hCLFFBQVEsRUFBRTtxQkFDVixLQUFLLENBQUMsSUFBSSxDQUFDO3FCQUNYLEtBQUssQ0FBQyxDQUFDLENBQUM7cUJBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxTQUFTLEdBQUcsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxLQUFLLEdBQUcsU0FBUztxQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO29CQUM3QixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDekM7Z0JBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7b0JBQ3BCLElBQUksQ0FBQyxHQUFHO3dCQUFFLE9BQU87b0JBQ2pCLE9BQU8sSUFBSSxNQUFNLENBQUM7d0JBQ2QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO3dCQUN6QyxLQUFLLEVBQUUsTUFBQSxHQUFHLENBQUMsS0FBSyxtQ0FBSSxHQUFHO3dCQUN2QixLQUFLLEVBQUUsTUFBQSxHQUFHLENBQUMsS0FBSyxtQ0FBSSxLQUFLO3dCQUN6QixhQUFhO3dCQUNiLE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDO3FCQUM3QixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztTQUNMO1FBRUQsYUFBYTtRQUNiLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFnQixFQUFFLEVBQUU7WUFDckMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFBLENBQUM7UUFFRixlQUFlO1FBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0oifQ==