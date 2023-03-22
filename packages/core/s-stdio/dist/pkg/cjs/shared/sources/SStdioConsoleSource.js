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
const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _nativeConsole[key] = console[key];
}
// process.on('unhandledRejection', (error) => {
//     throw error;
// });
// process.on('uncaughtException', (error) => {
//     _nativeConsole.log(error);
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
        var _a;
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            _nativeConsole[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : _nativeConsole.log;
            console[key] = (...args) => {
                var _a;
                args = args.filter((log) => {
                    var _a;
                    // // do not use this in iframe
                    // if (__isInIframe()) {
                    //     return;
                    // }
                    if (log === null || log === undefined) {
                        _nativeConsole.log(log);
                        return false;
                    }
                    if ((_a = log === null || log === void 0 ? void 0 : log.toString) === null || _a === void 0 ? void 0 : _a.call(log).match(/[a-zA-Z0-9]Error\:/)) {
                        _nativeConsole.error(log);
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
                    var _a, _b, _c;
                    // if (!log) return;
                    return new s_log_1.default({
                        type: (_a = log === null || log === void 0 ? void 0 : log.type) !== null && _a !== void 0 ? _a : s_log_1.default.TYPE_LOG,
                        value: log,
                        group: (_b = log === null || log === void 0 ? void 0 : log.group) !== null && _b !== void 0 ? _b : group,
                        notify: key === 'notify' || (log === null || log === void 0 ? void 0 : log.notify),
                        verbose: key === 'verbose' || (log === null || log === void 0 ? void 0 : log.verbose),
                        metas: (_c = log === null || log === void 0 ? void 0 : log.metas) !== null && _c !== void 0 ? _c : {},
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
exports.default = SStdioConsoleSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBRXpDLG1FQUE2QztBQU03QyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDMUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUU7SUFDdEUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0QztBQUVELGdEQUFnRDtBQUNoRCxtQkFBbUI7QUFDbkIsTUFBTTtBQUVOLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsTUFBTTtBQUVOLE1BQXFCLG1CQUNqQixTQUFRLHNCQUFjO0lBS3RCLFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSHBCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBS2pCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixhQUFhO1FBQ2IsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQWdCLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUEsQ0FBQztRQUVGLGVBQWU7UUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FB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