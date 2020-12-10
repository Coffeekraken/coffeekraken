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
const uniqid_1 = __importDefault(require("../string/uniqid"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const child_process_1 = require("child_process");
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SIpcServer_1 = __importDefault(require("../ipc/SIpcServer"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
/**
 * @name            spawn
 * @namespace       sugar.node.process
 * @type            Function
 * @async
 * @wip
 *
 * This function allows you to spawn a new child process just like the native ```spawn``` node function
 * but add the support for SPromise and SIpc communication layers
 *
 * @param       {String}          command         The command to spawn
 * @param       {String[]}        [args=[]]       Some string arguments to use in the command
 * @param       {ISpawnSettings}    [settings={}]     An object of settings to configure your spawn process
 * @return      {SPromise}                        An SPromise instance that will be resolved or rejected with the command result, and listen for some "events" triggered like "close", etc...
 *
 * @setting     {Boolean}       [ipc=false]         Specify if you want to initialise an SIpcServer instance for this spawn process
 * @setting     {Any}           ...SpawnOptions     All the supported ```spawn``` options. see: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 *
 * @event       data        Triggered when some data have been pushed in the child process like console.log, etc...
 * @event       error       Triggered when an error has occured in the child process
 * @event       close       Triggered when the child process has been closed for whatever reason
 * @event       close.error     Triggered when the child process has been closed due to an error
 * @event       close.cancel      Triggered when the child process has been closed due to the call of the ```cancel``` method
 * @event       close.kill      Triggered when the child process has been closed due to a kill call
 * @event       close.success   Triggered when the child process has been closed after a successfull execution
 *
 * @example       js
 * import spawn from '@coffeekraken/sugar/node/process/spawn';
 * const pro = spawn('echo "hello world");
 * pro.on('close', () => {
 *   console.log('closed');
 * });
 * console.log(await pro);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function spawn(command, args = [], settings = {}) {
    let uniquid = `SIpc.spawn.${uniqid_1.default()}`;
    let childProcess;
    let ipcServer, serverData, isCancel = false;
    const promise = new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            ipc: true
        }, settings);
        if (settings.ipc === true) {
            ipcServer = yield SIpcServer_1.default.getGlobalServer();
            ipcServer.on(`${uniquid}.*`, (data, metas) => {
                trigger(metas.stack.replace(uniquid + '.', ''), data);
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
        trigger('start');
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                stdout.push(data.toString());
                trigger('log', data.toString());
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                stderr.push(data.toString());
                trigger('error', data.toString());
            });
        }
        childProcess.on('close', (code, signal) => {
            trigger('close', {
                code,
                signal
            });
            if (stderr.length) {
                trigger('close.error');
                reject(stderr.join('\n'));
            }
            else if (!code && signal) {
                trigger('close.killed');
                reject();
            }
            else if (code === 0 && !signal) {
                trigger('close.success');
                resolve();
            }
            else {
                trigger('close.error');
                reject();
            }
        });
    }));
    // handle cancel
    promise.on('cancel', () => __awaiter(this, void 0, void 0, function* () {
        console.log('CANCELED');
        if (ipcServer !== undefined) {
            ipcServer.stop();
        }
        if (childProcess !== undefined) {
            childProcess.kill();
        }
    }));
    return promise;
};
module.exports = fn;
//# sourceMappingURL=module.js.map