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
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
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
                    var _a, _b, _c, _d;
                    if (!log)
                        return;
                    return new __SLog({
                        type: (_a = log.type) !== null && _a !== void 0 ? _a : __SLog.TYPE_LOG,
                        value: (_b = log.value) !== null && _b !== void 0 ? _b : log,
                        group: (_c = log.group) !== null && _c !== void 0 ? _c : group,
                        notify: key === 'notify' || log.notify,
                        verbose: key === 'verbose' || log.verbose,
                        metas: (_d = log.metas) !== null && _d !== void 0 ? _d : {},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBTTdDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFDakIsU0FBUSxjQUFjO0lBS3RCLFlBQVksUUFBZ0Q7O1FBQ3hELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhwQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUtqQixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSyxJQUFJLEdBQUcsSUFBSTtZQUNaLEtBQUs7WUFDTCxPQUFPO1lBQ1AsTUFBTTtZQUNOLFNBQVM7WUFDVCxTQUFTO1lBQ1QsUUFBUTtTQUNYLEVBQUU7WUFDQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTs7Z0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLO3FCQUNoQixRQUFRLEVBQUU7cUJBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQztxQkFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sU0FBUyxHQUFHLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksS0FBSyxHQUFHLFNBQVM7cUJBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzt5QkFDWCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFEO2dCQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDN0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ3pDO2dCQUVELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O29CQUNwQixJQUFJLENBQUMsR0FBRzt3QkFBRSxPQUFPO29CQUNqQixPQUFPLElBQUksTUFBTSxDQUFDO3dCQUNkLElBQUksRUFBRSxNQUFBLEdBQUcsQ0FBQyxJQUFJLG1DQUFJLE1BQU0sQ0FBQyxRQUFRO3dCQUNqQyxLQUFLLEVBQUUsTUFBQSxHQUFHLENBQUMsS0FBSyxtQ0FBSSxHQUFHO3dCQUN2QixLQUFLLEVBQUUsTUFBQSxHQUFHLENBQUMsS0FBSyxtQ0FBSSxLQUFLO3dCQUN6QixNQUFNLEVBQUUsR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTTt3QkFDdEMsT0FBTyxFQUFFLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLE9BQU87d0JBQ3pDLEtBQUssRUFBRSxNQUFBLEdBQUcsQ0FBQyxLQUFLLG1DQUFJLEVBQUU7d0JBQ3RCLGFBQWE7d0JBQ2IsTUFBTSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUM7cUJBQzdCLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxhQUFhO1FBQ2IsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQWdCLEVBQUUsRUFBRTtZQUNyQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUEsQ0FBQztRQUVGLGVBQWU7UUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDSiJ9