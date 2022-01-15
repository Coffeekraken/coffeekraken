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
import __deepMerge from '../../shared/object/deepMerge';
import { spawn as __spawn } from 'child_process';
import __SPromise from '@coffeekraken/s-promise';
import __onProcessExit from './onProcessExit';
import __SDuration from '@coffeekraken/s-duration';
import __isTestEnv from '../../shared/is/testEnv';
import __SLog from '@coffeekraken/s-log';
import __SSugarCli from '@coffeekraken/cli';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
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
        command = __SSugarCli.replaceTokens(command);
        const eventEmitter = yield __SEventEmitter.ipcServer();
        pipe(eventEmitter);
        childProcess = __spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'], detached: true, cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV, IS_CHILD_PROCESS: true }) }));
        let childProcessExitPromiseResolve;
        process.on('exit', function () {
            childProcess.kill();
        });
        __onProcessExit(() => {
            new Promise((resolve) => {
                childProcessExitPromiseResolve = resolve;
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing child process "<yellow>${command}</yellow>"`,
                });
                childProcess.kill('SIGINT');
            });
        });
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                var _a;
                console.log((_a = data.toString) === null || _a === void 0 ? void 0 : _a.call(data));
                if (!data)
                    return;
                stdout.push(data.toString());
                emit('log', {
                    type: __SLog.TYPE_CHILD_PROCESS,
                    value: data.toString(),
                });
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                if (!data)
                    return;
                stderr.push(data.toString());
                emit('log', {
                    type: __SLog.TYPE_CHILD_PROCESS,
                    value: data.toString(),
                });
            });
        }
        let isEnded = false;
        childProcess.on('close', (code, signal) => {
            if (isEnded)
                return;
            isEnded = true;
            // build the result object
            const resultObj = Object.assign({ code,
                signal, value: resolveValue ||
                    rejectValue ||
                    `${stdout.toString()}\n${stderr.toString()}`, stdout,
                stderr, spawn: true }, duration.end());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sVUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFdBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQXFENUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQ3pCLE9BQWUsRUFDZixPQUFrQixFQUFFLEVBQ3BCLFFBQWtDO0lBRWxDLElBQUksWUFBWSxDQUFDO0lBRWpCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3JFLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDekIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBaUIsRUFBRSxXQUFnQixDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDREQUE0RDtRQUM1RCxPQUFPLEdBQUcsV0FBVyxD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