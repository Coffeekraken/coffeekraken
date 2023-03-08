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
                    // // do not use this in iframe
                    // if (__isInIframe()) {
                    //     return;
                    // }
                    var _a;
                    if (!log === null || log === undefined) {
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
                    // if (!log) return;
                    var _a, _b, _c, _d;
                    return new s_log_1.default({
                        type: (_a = log === null || log === void 0 ? void 0 : log.type) !== null && _a !== void 0 ? _a : s_log_1.default.TYPE_LOG,
                        value: (_b = log === null || log === void 0 ? void 0 : log.value) !== null && _b !== void 0 ? _b : log,
                        group: (_c = log === null || log === void 0 ? void 0 : log.group) !== null && _c !== void 0 ? _c : group,
                        notify: key === 'notify' || (log === null || log === void 0 ? void 0 : log.notify),
                        verbose: key === 'verbose' || (log === null || log === void 0 ? void 0 : log.verbose),
                        metas: (_d = log === null || log === void 0 ? void 0 : log.metas) !== null && _d !== void 0 ? _d : {},
                        // @ts-ignore
                        logger: _nativeConsole[key],
                    });
                });
                args.forEach((log) => {
                    // global._console.log(log);
                    this.log(log);
                });
            };
        }
    }
}
exports.default = SStdioConsoleSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBRXpDLG1FQUE2QztBQU03QyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDMUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUU7SUFDdEUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0QztBQUVELGdEQUFnRDtBQUNoRCxtQkFBbUI7QUFDbkIsTUFBTTtBQUVOLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsTUFBTTtBQUVOLE1BQXFCLG1CQUNqQixTQUFRLHNCQUFjO0lBS3RCLFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSHBCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBS2pCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixhQUFhO1FBQ2IsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQWdCLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUEsQ0FBQztRQUVGLGVBQWU7UUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FB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