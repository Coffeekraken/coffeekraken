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
import { __wait } from '@coffeekraken/sugar/datetime';
const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _nativeConsole[key] = console[key];
}
export default class SStdioConsoleSource extends __SStdioSource {
    constructor(settings) {
        super(settings);
        this._tmpPrintedLogs = [];
        // overrtide native console
        this._overrideNativeConsole();
        // @ts-ignore
        console.ask = (askObj) => __awaiter(this, void 0, void 0, function* () {
            this._restoreNativeConsole();
            yield __wait(100);
            const res = yield this.ask(askObj);
            this._overrideNativeConsole();
            return res;
        });
        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }
    /**
     * Restore native console (for ask, etc...)
     */
    _restoreNativeConsole() {
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            console[key] = _nativeConsole[key];
        }
    }
    /**
     * Override native console
     */
    _overrideNativeConsole() {
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            // _nativeConsole[key] = console[key] ?? _nativeConsole.log;
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
                        logger: _nativeConsole[key],
                    });
                });
                args.forEach((log) => {
                    this.log(log);
                });
            };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUt0RCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDMUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUU7SUFDdEUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0QztBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQ2pCLFNBQVEsY0FBYztJQUt0QixZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhwQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUtqQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsYUFBYTtRQUNiLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFnQixFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFBLENBQUM7UUFFRixlQUFlO1FBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFD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