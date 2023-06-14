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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const SStdioSource_1 = __importDefault(require("../SStdioSource"));
// save the native console methods in a _console stack
const _console = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _console[key] = console[key];
}
// expose _console globally
try {
    global._console = _console;
}
catch (e) { }
// process.on('unhandledRejection', (error) => {
//     throw error;
// });
// process.on('uncaughtException', (error) => {
//     _console.log(error);
// });
class SStdioConsoleSource extends SStdioSource_1.default {
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
                    return new s_log_1.default({
                        type: (_b = (_a = log === null || log === void 0 ? void 0 : log.type) !== null && _a !== void 0 ? _a : key) !== null && _b !== void 0 ? _b : s_log_1.default.TYPE_LOG,
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
exports.default = SStdioConsoleSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBRXpDLG1FQUE2QztBQU03QyxzREFBc0Q7QUFDdEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUFFO0lBQ3RFLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDaEM7QUFDRCwyQkFBMkI7QUFDM0IsSUFBSTtJQUNBLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0NBQzlCO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtBQUVkLGdEQUFnRDtBQUNoRCxtQkFBbUI7QUFDbkIsTUFBTTtBQUVOLCtDQUErQztBQUMvQywyQkFBMkI7QUFDM0IsTUFBTTtBQUVOLE1BQXFCLG1CQUNqQixTQUFRLHNCQUFjO0lBS3RCLFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSHBCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBS2pCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixhQUFhO1FBQ2IsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQWdCLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENB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