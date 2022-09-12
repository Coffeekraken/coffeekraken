"use strict";
// @ts-nocheck
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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const child_process_1 = require("child_process");
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const process_1 = require("@coffeekraken/sugar/process");
function spawn(command, args = [], settings) {
    let childProcess;
    const promise = new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = (0, deepMerge_1.default)({
            pipeEvents: true,
            returnValueOnly: false,
        }, settings !== null && settings !== void 0 ? settings : {});
        const duration = new s_duration_1.default();
        let resolveValue, rejectValue;
        const stderr = [], stdout = [];
        // replace tokens using the SSugarCli replaceTokens function
        // command = replaceCommandTokens(command);
        const eventEmitter = yield s_event_emitter_1.default.ipcServer();
        pipe(eventEmitter);
        childProcess = (0, child_process_1.spawn)(command, [], Object.assign(Object.assign({ shell: true, stdio: ['pipe', 'pipe', 'pipe'], 
            // stdio: 'inherit',
            // detached: true,
            cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, 
                // @todo        Check if this needed or not...
                // NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV,
                IS_CHILD_PROCESS: true }) }));
        let childProcessExitPromiseResolve;
        process.on('exit', function () {
            childProcess.kill();
        });
        (0, process_1.__onProcessExit)(() => {
            new Promise((resolve) => {
                childProcessExitPromiseResolve = resolve;
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing child process "<cyan>${command}</cyan>"`,
                });
                childProcess.kill('SIGINT');
            });
        });
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                if (!data)
                    return;
                stdout.push(data.toString());
                if (process.env.NODE_ENV === 'test') {
                    console.log(data.toString());
                }
                else {
                    emit('log', {
                        type: s_log_1.default.TYPE_CHILD_PROCESS,
                        value: data.toString(),
                    });
                }
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                if (!data)
                    return;
                stderr.push(data.toString());
                if (process.env.NODE_ENV === 'test') {
                    console.error(data.toString());
                }
                else {
                    emit('log', {
                        type: s_log_1.default.TYPE_CHILD_PROCESS,
                        value: data.toString(),
                    });
                    emit('error', {
                        type: s_log_1.default.TYPE_CHILD_PROCESS,
                        value: data.toString(),
                    });
                }
            });
        }
        let isEnded = false;
        childProcess.on('close', (code, signal) => {
            var _a;
            if (isEnded)
                return;
            isEnded = true;
            // build and parse the value if possible
            let value = (_a = resolveValue !== null && resolveValue !== void 0 ? resolveValue : rejectValue) !== null && _a !== void 0 ? _a : undefined;
            try {
                value = JSON.parse(value);
            }
            catch (e) { }
            // build the result object
            const resultObj = Object.assign({ code,
                signal,
                value,
                stdout,
                stderr, spawn: true }, duration.end());
            if (resultObj.value === undefined) {
                delete resultObj.value;
            }
            // closed by this process
            childProcessExitPromiseResolve === null || childProcessExitPromiseResolve === void 0 ? void 0 : childProcessExitPromiseResolve();
            // generic close event
            emit('close', resultObj);
            // handle resolve and reject
            if (resolveValue) {
                emit('close.success', resultObj);
                if (settings.returnValueOnly)
                    return resolve(resultObj.value);
                return resolve(resultObj);
            }
            else if (rejectValue) {
                emit('close.error', resultObj);
                if (settings.returnValueOnly)
                    return reject(resultObj.value);
                return reject(resultObj);
            }
            // handle other cases
            if (stderr.length) {
                emit('close.error', resultObj);
                if (settings.returnValueOnly)
                    return reject(resultObj.value);
                return reject(resultObj);
            }
            else if (!code && signal) {
                emit('close.killed', resultObj);
                if (settings.returnValueOnly)
                    return resolve(resultObj.value);
                return resolve(resultObj);
            }
            else if (code === 0 && !signal) {
                emit('close.success', resultObj);
                if (settings.returnValueOnly)
                    return resolve(resultObj.value);
                return resolve(resultObj);
            }
            else {
                emit('close.error', resultObj);
                if (settings.returnValueOnly)
                    return reject(resultObj.value);
                return reject(resultObj);
            }
        });
    }), {});
    return promise;
}
exports.default = spawn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCxvRkFBNEQ7QUFDNUQsZ0VBQXlDO0FBRXpDLHdFQUFpRDtBQUNqRCxpREFBK0Q7QUFDL0QsOEVBQXdEO0FBQ3hELHlEQUE4RDtBQXNEOUQsU0FBd0IsS0FBSyxDQUN6QixPQUFlLEVBQ2YsT0FBa0IsRUFBRSxFQUNwQixRQUFrQztJQUVsQyxJQUFJLFlBQVksQ0FBQztJQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDckUsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7WUFDSSxVQUFVLEVBQUUsSUFBSTtZQUNoQixlQUFlLEVBQUUsS0FBSztTQUN6QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBaUIsRUFBRSxXQUFnQixDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDREQUE0RDtRQUM1RCwyQ0FBMkM7UUFDM0MsTUFBTSxZQUFZLEdBQUcsTUFBTSx5QkFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQixZQUFZLEdBQUcsSUFBQSxxQkFBTyxFQUFDLE9BQU8sRUFBRSxFQUFFLGdDQUM5QixLQUFLLEVBQUUsSUFBSSxFQUNYLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQy9CLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIs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