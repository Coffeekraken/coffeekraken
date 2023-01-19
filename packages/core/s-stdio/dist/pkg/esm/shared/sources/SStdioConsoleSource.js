import __SLog from '@coffeekraken/s-log';
import __SStdioSource from '../SStdioSource';
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
                const stack = e.stack.toString().split('\n').slice(2).map(str => str.trim());
                const callerStr = (_a = stack[0]) !== null && _a !== void 0 ? _a : '';
                let group = callerStr.split(' ')[callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                args = args.map(log => {
                    var _a, _b;
                    return new __SLog({
                        type: __SLog[`TYPE_${key.toUpperCase()}`],
                        value: (_a = log.value) !== null && _a !== void 0 ? _a : log,
                        group: (_b = log.group) !== null && _b !== void 0 ? _b : group,
                        // @ts-ignore
                        logger: nativeConsole[key]
                    });
                });
                args.forEach(log => {
                    this.log(log);
                });
            };
        }
        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBUzdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsY0FBYztJQUkzRCxZQUFZLFFBQWdEOztRQUN4RCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFIcEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFLakIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxTQUFTLENBQUMsRUFBRTtZQUNoRCxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTs7Z0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDN0UsTUFBTSxTQUFTLEdBQUcsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7O29CQUNsQixPQUFPLElBQUksTUFBTSxDQUFDO3dCQUNkLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQzt3QkFDekMsS0FBSyxFQUFFLE1BQUEsR0FBRyxDQUFDLEtBQUssbUNBQUksR0FBRzt3QkFDdkIsS0FBSyxFQUFFLE1BQUEsR0FBRyxDQUFDLEtBQUssbUNBQUksS0FBSzt3QkFDekIsYUFBYTt3QkFDYixNQUFNLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQztxQkFDN0IsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7U0FDTDtRQUVELGVBQWU7UUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FFSiJ9