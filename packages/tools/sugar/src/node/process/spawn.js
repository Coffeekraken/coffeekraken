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
//# sourceMappingURL=spawn.js.map