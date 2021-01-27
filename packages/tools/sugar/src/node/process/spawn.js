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
const uniqid_1 = __importDefault(require("../string/uniqid"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const child_process_1 = require("child_process");
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
function spawn(command, args = [], settings = {}) {
    let uniquid = `SIpc.spawn.${uniqid_1.default()}`;
    let childProcess;
    let ipcServer, serverData, isCancel = false;
    const promise = new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            ipc: true
        }, settings);
        // if (settings.ipc === true) {
        //   ipcServer = await __SIpcServer.getGlobalServer();
        //   ipcServer.on(`${uniquid}.*`, (data, metas) => {
        //     emit(metas.stack.replace(uniquid + '.', ''), data);
        //   });
        // }
        const stderr = [], stdout = [];
        let envIpc = {};
        if (ipcServer !== undefined) {
            envIpc = {
                S_IPC_SERVER: JSON.stringify(ipcServer.connexionParams),
                S_IPC_SPAWN_ID: uniquid
            };
        }
        childProcess = child_process_1.spawn(command, [], Object.assign(Object.assign({ shell: true }, settings), { stdio: settings.stdio === false
                ? 'ignore'
                : settings.stdio !== undefined
                    ? settings.stdio
                    : 'pipe', env: Object.assign(Object.assign(Object.assign(Object.assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, IS_CHILD_PROCESS: true }), (settings.env || {})), envIpc) }));
        onProcessExit_1.default(() => {
            childProcess.kill();
        });
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                stdout.push(data.toString());
                emit('log', {
                    value: data.toString()
                });
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                stderr.push(data.toString());
                emit('error', {
                    value: data.toString()
                });
            });
        }
        childProcess.on('close', (code, signal) => {
            emit('close', {
                code,
                signal
            });
            if (stderr.length) {
                emit('close.error');
                reject(stderr.join('\n'));
            }
            else if (!code && signal) {
                emit('close.killed');
                reject();
            }
            else if (code === 0 && !signal) {
                emit('close.success');
                resolve();
            }
            else {
                emit('close.error');
                reject();
            }
        });
    }));
    // handle cancel
    promise.on('finally', () => {
        if (ipcServer !== undefined) {
            ipcServer.stop();
        }
        if (childProcess !== undefined) {
            childProcess.kill();
        }
    });
    return promise;
}
exports.default = spawn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw4REFBeUM7QUFDekMsb0VBQThDO0FBQzlDLGlEQUFpRDtBQUNqRCxtRUFBNkM7QUFFN0Msb0VBQThDO0FBbUQ5QyxTQUF3QixLQUFLLENBQzNCLE9BQWUsRUFDZixPQUFpQixFQUFFLEVBQ25CLFdBQTJCLEVBQUU7SUFFN0IsSUFBSSxPQUFPLEdBQUcsY0FBYyxnQkFBUyxFQUFFLEVBQUUsQ0FBQztJQUMxQyxJQUFJLFlBQVksQ0FBQztJQUNqQixJQUFJLFNBQVMsRUFDWCxVQUFVLEVBQ1YsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVuQixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNqRSxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxHQUFHLEVBQUUsSUFBSTtTQUNWLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiwrQkFBK0I7UUFDL0Isc0RBQXNEO1FBQ3RELG9EQUFvRDtRQUNwRCwwREFBMEQ7UUFDMUQsUUFBUTtRQUNSLElBQUk7UUFFSixNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxHQUFHO2dCQUNQLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZELGNBQWMsRUFBRSxPQUFPO2FBQ3hCLENBQUM7U0FDSDtRQUVELFlBQVksR0FBRyxxQkFBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdDQUNoQyxLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsS0FDWCxLQUFLLEVBQ0gsUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLO2dCQUN0QixDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTO29CQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUs7b0JBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQ1osR0FBRyw4REFDRSxPQUFPLENBQUMsR0FBRyxLQUNkLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO29CQUNsRCxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDO29CQUNyQyxDQUFDLENBQUMsQ0FBQyxFQUNMLGdCQUFnQixFQUFFLElBQUksS0FDbkIsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUNwQixNQUFNLEtBRVgsQ0FBQztRQUVILHVCQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILDJCQUEyQjtRQUMzQixJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDdkIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7aUJBQ3ZCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDdkIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7aUJBQ3ZCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLElBQUk7Z0JBQ0osTUFBTTthQUNQLENBQUMsQ0FBQztZQUNILElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDO2FBQ1Y7aUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLEVBQUUsQ0FBQzthQUNWO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsZ0JBQWdCO0lBQ2hCLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUN6QixJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzlCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQS9HRCx3QkErR0MifQ==