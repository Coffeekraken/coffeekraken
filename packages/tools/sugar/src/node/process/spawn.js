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
        childProcess = __spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'], cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), (settings.env || {})), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL ? process.env.CHILD_PROCESS_LEVEL + 1 : 1, NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV, IS_CHILD_PROCESS: true }) }));
        __onProcessExit(() => {
            childProcess.kill();
        });
        // handle the process.send pattern
        if (settings.pipeEvents) {
            childProcess.on('message', (dataObj) => {
                // console.log('MESSAGE', dataObj);
                if (!dataObj.value || !dataObj.metas)
                    return;
                if (dataObj.metas.event === 'resolve') {
                    resolveValue = dataObj.value;
                    childProcess.kill('SIGINT');
                }
                else if (dataObj.metas.event === 'reject') {
                    rejectValue = dataObj.value;
                    childProcess.kill('SIGINT');
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
                signal, value: resolveValue || rejectValue || `${stdout.toString()}\n${stderr.toString()}`, stdout,
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
    }));
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sVUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQWtEekMsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQWtCLEVBQUUsRUFBRSxRQUFrQztJQUNuRyxJQUFJLFlBQVksQ0FBQztJQUVqQixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9ELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDekIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBaUIsRUFBRSxXQUFnQixDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0NBQzlCLEtBQUssRUFBRSxJQUFJLEVBQ1gsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUs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