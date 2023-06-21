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
import __SDuration from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import { spawn as __spawn } from 'child_process';
import __deepMerge from '../../shared/object/deepMerge';
import __onProcessExit from './onProcessExit';
const _nativeLog = console.log;
export default function spawn(command, args = [], settings) {
    let childProcess;
    const promise = new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        settings = __deepMerge({
            pipeEvents: true,
            returnValueOnly: false,
        }, settings !== null && settings !== void 0 ? settings : {});
        const duration = new __SDuration();
        let resolveValue, rejectValue;
        const stderr = [], stdout = [];
        // replace tokens using the SSugarCli replaceTokens function
        // command = replaceCommandTokens(command);
        const eventEmitter = yield __SEventEmitter.ipcServer();
        pipe(eventEmitter);
        childProcess = __spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['inherit', 'inherit', 'inherit', 'ipc'], 
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
        __onProcessExit(() => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUErQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFVL0IsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQ3pCLE9BQWUsRUFDZixPQUFrQixFQUFFLEVBQ3BCLFFBQWtDO0lBRWxDLElBQUksWUFBWSxDQUFDO0lBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3JFLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDekIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBaUIsRUFBRSxXQUFnQixDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDREQUE0RDtRQUM1RCwyQ0FBMkM7UUFDM0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFD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