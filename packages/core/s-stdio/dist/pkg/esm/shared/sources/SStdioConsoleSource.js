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
// save the native console methods in a _console stack
const _console = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _console[key] = console[key];
}
// expose _console globally
global._console = _console;
// process.on('unhandledRejection', (error) => {
//     throw error;
// });
// process.on('uncaughtException', (error) => {
//     _console.log(error);
// });
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
        setTimeout(() => {
            this.ready();
        });
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
            console[key] = _console[key];
        }
    }
    /**
     * Override native console
     */
    _overrideNativeConsole() {
        var _a;
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            _console[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : _console.log;
            console[key] = (...args) => {
                var _a;
                args = args.filter((log) => {
                    var _a;
                    // // do not use this in iframe
                    // if (__isInIframe()) {
                    //     return;
                    // }
                    if (log === null || log === undefined) {
                        _console.log(log);
                        return false;
                    }
                    if ((_a = log === null || log === void 0 ? void 0 : log.toString) === null || _a === void 0 ? void 0 : _a.call(log).match(/[a-zA-Z0-9]Error\:/)) {
                        _console.error(log);
                        return false;
                    }
                    return true;
                });
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
                    // if (!log) return;
                    return new __SLog({
                        type: (_b = (_a = log === null || log === void 0 ? void 0 : log.type) !== null && _a !== void 0 ? _a : key) !== null && _b !== void 0 ? _b : __SLog.TYPE_LOG,
                        value: log,
                        group: (_c = log === null || log === void 0 ? void 0 : log.group) !== null && _c !== void 0 ? _c : group,
                        notify: key === 'notify' || (log === null || log === void 0 ? void 0 : log.notify),
                        verbose: key === 'verbose' || (log === null || log === void 0 ? void 0 : log.verbose),
                        metas: (_d = log === null || log === void 0 ? void 0 : log.metas) !== null && _d !== void 0 ? _d : {},
                        // @ts-ignore
                        logger: _console[key],
                    });
                });
                args.forEach((log) => {
                    this.log(log);
                });
            };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBTTdDLHNEQUFzRDtBQUN0RCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUU7SUFDdEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQztBQUNELDJCQUEyQjtBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixnREFBZ0Q7QUFDaEQsbUJBQW1CO0FBQ25CLE1BQU07QUFFTiwrQ0FBK0M7QUFDL0MsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUNqQixTQUFRLGNBQWM7SUFLdEIsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFIcEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFLakIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLGFBQWE7UUFDYixPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBZ0IsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixPQUFPLEdBQUcsQ0FBQztRQUNm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