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
        childProcess = (0, child_process_1.spawn)(command, [], Object.assign(Object.assign({ shell: true, stdio: ['inherit', 'inherit', 'inherit', 'ipc'], maxBuffer: 1024 * 1024 * 100, cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
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