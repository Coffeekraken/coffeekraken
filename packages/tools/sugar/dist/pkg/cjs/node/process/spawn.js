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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const child_process_1 = require("child_process");
const deepMerge_js_1 = __importDefault(require("../../shared/object/deepMerge.js"));
const onProcessExit_js_1 = __importDefault(require("./onProcessExit.js"));
const _nativeLog = console.log;
function spawn(command, args = [], settings) {
    let childProcess;
    const promise = new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = (0, deepMerge_js_1.default)({
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
        childProcess = (0, child_process_1.spawn)(command, [], Object.assign(Object.assign({ shell: true, stdio: ['inherit', 'inherit', 'inherit', 'ipc'], 
            // stdio: 'inherit',
            // detached: true,
            maxBuffer: 1024 * 1024 * 100, cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, 
                // @todo        Check if this needed or not...
                // NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV,
                IS_CHILD_PROCESS: true }) }));
        childProcess.on('message', (data) => {
            if (data.command) {
                switch (data.command) {
                    case 'chdir':
                        console.log(`<yellow>[spawn]</yellow> Changing working directory to "<cyan>${data.args}</cyan>"`);
                        process.chdir(data.args);
                        break;
                    default:
                        throw new Error(`<red>spawn</red> Sorry but the passed "<yellow>${data.command}</yellow>" is not supported...`);
                        break;
                }
            }
        });
        (0, onProcessExit_js_1.default)(() => {
            return new Promise((resolve) => {
                console.log(`<red>[kill]</red> Gracefully killing process "<cyan>${command.trim()}</cyan>"`);
                childProcess.on('exit', (code) => __awaiter(this, void 0, void 0, function* () {
                    resolve();
                }));
                childProcess.kill();
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCxvRkFBNEQ7QUFFNUQsd0VBQWlEO0FBQ2pELGlEQUErRDtBQUMvRCxvRkFBMkQ7QUFDM0QsMEVBQWlEO0FBK0NqRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBVS9CLFNBQXdCLEtBQUssQ0FDekIsT0FBZSxFQUNmLE9BQWtCLEVBQUUsRUFDcEIsUUFBa0M7SUFFbEMsSUFBSSxZQUFZLENBQUM7SUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3JFLFFBQVEsR0FBRyxJQUFBLHNCQUFXLEVBQ2xCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDekIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLFlBQWlCLEVBQUUsV0FBZ0IsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQ2IsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQiw0REFBNEQ7UUFDNUQsMkNBQTJDO1FBQzNDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUJBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkIsWUFBWSxHQUFHLElBQUEscUJBQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxnQ0FDOUIsS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFL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