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
export default function spawn(command, args = [], settings) {
    let childProcess;
    const promise = new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = __deepMerge({
            pipeEvents: true,
            returnValueOnly: false,
        }, settings !== null && settings !== void 0 ? settings : {});
        const duration = new __SDuration();
        let resolveValue, rejectValue;
        const stderr = [], stdout = [];
        childProcess = __spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'], cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV, IS_CHILD_PROCESS: true }) }));
        __onProcessExit(() => {
            childProcess.kill();
        });
        // handle the process.send pattern
        if (settings.pipeEvents) {
            childProcess.on('message', (dataObj) => {
                if (!dataObj.value || !dataObj.metas)
                    return;
                if (dataObj.metas.event === 'resolve') {
                    resolveValue = dataObj.value;
                    childProcess.kill('SIGINT');
                    resolve(dataObj.value);
                }
                else if (dataObj.metas.event === 'reject') {
                    rejectValue = dataObj.value;
                    childProcess.kill('SIGINT');
                    reject(dataObj.value);
                }
                else {
                    emit(dataObj.metas.event, dataObj.value, dataObj.metas);
                }
            });
        }
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                if (!data)
                    return;
                stdout.push(data.toString());
                emit('log', {
                    type: __SLog.CHILD_PROCESS,
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
                    type: __SLog.CHILD_PROCESS,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sVUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQXFEekMsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQ3pCLE9BQWUsRUFDZixPQUFrQixFQUFFLEVBQ3BCLFFBQWtDO0lBRWxDLElBQUksWUFBWSxDQUFDO0lBRWpCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDL0QsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7WUFDSSxVQUFVLEVBQUUsSUFBSTtZQUNoQixlQUFlLEVBQUUsS0FBSztTQUN6QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFpQixFQUFFLFdBQWdCLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQ0FDOUIsS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFB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