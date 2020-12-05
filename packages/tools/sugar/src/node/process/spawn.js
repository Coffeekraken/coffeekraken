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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const child_process_1 = require("child_process");
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SIpcServer_1 = __importDefault(require("../ipc/SIpcServer"));
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
    return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            ipc: true
        }, settings);
        let ipcServer, serverData;
        if (settings.ipc === true) {
            ipcServer = new SIpcServer_1.default();
            serverData = yield ipcServer.start();
            ipcServer.on('*', (data, metas) => {
                trigger(metas.stack, data);
            });
        }
        const stderr = [], stdout = [];
        const childProcess = child_process_1.spawn(command, [], Object.assign(Object.assign({ shell: true }, settings), { env: Object.assign(Object.assign({}, (settings.env || {})), { S_IPC_SERVER: JSON.stringify(serverData) }) }));
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                stdout.push(data.toString());
                trigger('data', data.toString());
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                stderr.push(data);
                trigger('error', data);
            });
        }
        childProcess.on('close', (code, signal) => {
            if (stderr.length) {
                reject(stderr.join('\n'));
            }
            else if (!code && signal) {
                trigger('kill');
            }
            else if (code === 0 && !signal) {
                resolve();
            }
            else {
                reject();
            }
        });
        // handle cancel
        // this.on('cancel', () => {
        //   childProcess.kill();
        // });
    }));
};
module.exports = fn;
