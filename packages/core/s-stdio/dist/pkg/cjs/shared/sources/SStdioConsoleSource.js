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
const SStdioSource_js_1 = __importDefault(require("../SStdioSource.js"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
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
class SStdioConsoleSource extends SStdioSource_js_1.default {
    constructor(settings) {
        super(settings);
        this._tmpPrintedLogs = [];
        // overrtide native console
        this._overrideNativeConsole();
        // @ts-ignore
        console.ask = (askObj) => __awaiter(this, void 0, void 0, function* () {
            this._restoreNativeConsole();
            yield (0, datetime_1.__wait)(100);
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
                var _a, _b;
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
                    .map((str) => { var _a; return (_a = str.trim) === null || _a === void 0 ? void 0 : _a.call(str); });
                const callerStr = (_a = stack[0]) !== null && _a !== void 0 ? _a : '';
                let group = callerStr
                    .split(' ')[callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                if (group === 'Timeout') {
                    group = stack[1]
                        .split(' ')[callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                }
                if (group.match(`^file:\/\/\/`)) {
                    group = (_b = group.trim) === null || _b === void 0 ? void 0 : _b.call(group).split('/').pop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBRXpDLHlFQUFnRDtBQUVoRCwyREFBc0Q7QUFNdEQsc0RBQXNEO0FBQ3RELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRTtJQUN0RSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hDO0FBQ0QsMkJBQTJCO0FBQzNCLElBQUk7SUFDQSxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztDQUM5QjtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZCxnREFBZ0Q7QUFDaEQsbUJBQW1CO0FBQ25CLE1BQU07QUFFTiwrQ0FBK0M7QUFDL0MsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixNQUFxQixtQkFDakIsU0FBUSx5QkFBYztJQUt0QixZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhwQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUtqQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsYUFBYTtRQUNiLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFnQixFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLE9BQU8sR0FB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