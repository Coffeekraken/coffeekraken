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
const SIpcServer_1 = __importDefault(require("../ipc/SIpcServer"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
function spawn(command, args = [], settings = {}) {
    let uniquid = `SIpc.spawn.${uniqid_1.default()}`;
    let childProcess;
    let ipcServer, serverData, isCancel = false;
    const promise = new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            ipc: true
        }, settings);
        if (settings.ipc === true) {
            ipcServer = yield SIpcServer_1.default.getGlobalServer();
            ipcServer.on(`${uniquid}.*`, (data, metas) => {
                emit(metas.stack.replace(uniquid + '.', ''), data);
            });
        }
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
                    : null, env: Object.assign(Object.assign(Object.assign(Object.assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, IS_CHILD_PROCESS: true }), (settings.env || {})), envIpc) }));
        onProcessExit_1.default(() => {
            childProcess.kill();
        });
        emit('start');
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                stdout.push(data.toString());
                emit('log', data.toString());
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                stderr.push(data.toString());
                emit('error', data.toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw4REFBeUM7QUFDekMsb0VBQThDO0FBQzlDLGlEQUFpRDtBQUNqRCxtRUFBNkM7QUFDN0MsbUVBQTZDO0FBQzdDLG9FQUE4QztBQW1EOUMsU0FBd0IsS0FBSyxDQUMzQixPQUFlLEVBQ2YsT0FBaUIsRUFBRSxFQUNuQixXQUEyQixFQUFFO0lBRTdCLElBQUksT0FBTyxHQUFHLGNBQWMsZ0JBQVMsRUFBRSxFQUFFLENBQUM7SUFDMUMsSUFBSSxZQUFZLENBQUM7SUFDakIsSUFBSSxTQUFTLEVBQ1gsVUFBVSxFQUNWLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFFbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDakUsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsR0FBRyxFQUFFLElBQUk7U0FDVixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRTtZQUN6QixTQUFTLEdBQUcsTUFBTSxvQkFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFD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