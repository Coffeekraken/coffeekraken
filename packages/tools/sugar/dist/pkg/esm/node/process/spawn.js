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
        let childProcessExitPromiseResolve;
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
        process.on('exit', function () {
            childProcess.kill();
        });
        __onProcessExit(() => {
            new Promise((resolve) => {
                childProcessExitPromiseResolve = resolve;
                console.log(`<red>[kill]</red> Gracefully killing process "<cyan>${command}</cyan>"`);
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
            catch (e) {
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUErQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFVL0IsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQ3pCLE9BQWUsRUFDZixPQUFrQixFQUFFLEVBQ3BCLFFBQWtDO0lBRWxDLElBQUksWUFBWSxDQUFDO0lBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3JFLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDekIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBaUIsRUFBRSxXQUFnQixDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDREQUE0RDtRQUM1RCwyQ0FBMkM7UUFDM0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRW5CLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0NBQzlCLEtBQUssRUFBRSxJQUFJLEVBQ1gsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDO1lBQy9DLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsU0FBUyxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUM1QixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQy9CLFFBQVEsS0FDWCxHQUFHLGdEQUNJLE9BQU8sQ0FBQyxHQUFHLEdBQ1gsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUN2QixtQkFBbUIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtvQkFDaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsOENBQThDO2dCQUM5QyxrRUFBa0U7Z0JBQ2xFLGdCQUFnQixFQUFFLElBQUksT0FFNUIsQ0FBQztRQUVILElBQUksOEJBQThCLENBQUM7UUFFbkMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNsQixLQUFLLE9BQU87d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FDUCxpRUFBaUUsSUFBSSxDQUFDLElBQUksVUFBVSxDQUN2RixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixNQUFNO29CQUNWO3dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0RBQWtELElBQUksQ0FBQyxPQUFPLGdDQUFnQyxDQUNqRyxDQUFDO3dCQUNGLE1BQU07aUJBQ2I7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDZixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ2pCLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BCLDhCQUE4QixHQUFHLE9BQU8sQ0FBQztnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx1REFBdUQsT0FBTyxVQUFVLENBQzNFLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsOEJBQThCO1FBQzlCLDZCQUE2QjtRQUM3QixpREFBaUQ7UUFDakQsOERBQThEO1FBQzlELGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLHVDQUF1QztRQUN2Qyx5QkFBeUI7UUFDekIsNERBQTREO1FBQzVELHdCQUF3QjtRQUN4QixVQUFVO1FBQ1YsSUFBSTtRQUNKLDZCQUE2QjtRQUM3QixpREFBaUQ7UUFDakQsOERBQThEO1FBQzlELGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLHVDQUF1QztRQUN2Qyx5QkFBeUI7UUFDekIsNERBQTREO1FBQzVELHdCQUF3QjtRQUN4QixVQUFVO1FBQ1YsSUFBSTtRQUVKLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDdEMsSUFBSSxPQUFPO2dCQUFFLE9BQU87WUFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQztZQUVmLHdDQUF3QztZQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFBLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLFdBQVcsbUNBQUksU0FBUyxDQUFDO1lBQ3JELElBQUk7Z0JBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7WUFBQyxPQUFPLENBQUMsRUFBRTthQUNYO1lBRUQsMEJBQTBCO1lBQzFCLE1BQU0sU0FBUyxtQkFDWCxJQUFJO2dCQUNKLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxNQUFNO2dCQUNOLE1BQU0sRUFDTixLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsQ0FBQztZQUNGLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQzthQUMxQjtZQUVELHlCQUF5QjtZQUN6Qiw4QkFBOEIsYUFBOUIsOEJBQThCLHVCQUE5Qiw4QkFBOEIsRUFBSSxDQUFDO1lBRW5DLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXpCLDRCQUE0QjtZQUM1QixJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFFBQVEsQ0FBQyxlQUFlO29CQUFFLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQy9CLElBQUksUUFBUSxDQUFDLGVBQWU7b0JBQUUsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QjtZQUVELHFCQUFxQjtZQUNyQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxRQUFRLENBQUMsZUFBZTtvQkFBRSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO2lCQUFNLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO2dCQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLFFBQVEsQ0FBQyxlQUFlO29CQUFFLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFFBQVEsQ0FBQyxlQUFlO29CQUFFLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxRQUFRLENBQUMsZUFBZTtvQkFBRSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==