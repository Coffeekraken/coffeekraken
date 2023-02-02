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
import { __onProcessExit } from '@coffeekraken/sugar/process';
import { spawn as __spawn } from 'child_process';
import __deepMerge from '../../shared/object/deepMerge';
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
        childProcess = __spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['inherit', 'inherit', 'inherit'], 
            // stdio: 'inherit',
            // detached: true,
            maxBuffer: 1024 * 1024 * 50, cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, 
                // @todo        Check if this needed or not...
                // NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV,
                IS_CHILD_PROCESS: true }) }));
        let childProcessExitPromiseResolve;
        process.on('exit', function () {
            childProcess.kill();
        });
        __onProcessExit(() => {
            new Promise((resolve) => {
                childProcessExitPromiseResolve = resolve;
                console.log(`<red>[kill]</red> Gracefully killing child process "<cyan>${command}</cyan>"`);
                childProcess.kill('SIGINT');
            });
        });
        // // listen for errors etc...
        // if (childProcess.stdout) {
        //     childProcess.stdout.on('data', (data) => {
        //         if (!data || data.toString().trim() === '') return;
        //         data = data.toString();
        //         stdout.push(data);
        //         try {
        //             data = JSON.parse(data);
        //         } catch (e) {}
        //         const logger = console[data.type] ?? console.log;
        //         logger(data);
        //     });
        // }
        // if (childProcess.stderr) {
        //     childProcess.stderr.on('data', (data) => {
        //         if (!data || data.toString().trim() === '') return;
        //         data = data.toString();
        //         stderr.push(data);
        //         try {
        //             data = JSON.parse(data);
        //         } catch (e) {}
        //         const logger = console[data.type] ?? console.log;
        //         logger(data);
        //     });
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBc0R4RCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FDekIsT0FBZSxFQUNmLE9BQWtCLEVBQUUsRUFDcEIsUUFBa0M7SUFFbEMsSUFBSSxZQUFZLENBQUM7SUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDckUsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7WUFDSSxVQUFVLEVBQUUsSUFBSTtZQUNoQixlQUFlLEVBQUUsS0FBSztTQUN6QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFpQixFQUFFLFdBQWdCLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsNERBQTREO1FBQzVELDJDQUEyQztRQUMzQyxNQUFNLFlBQVksR0FBRyxNQUFNLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkIsWUFBWSxHQUFH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