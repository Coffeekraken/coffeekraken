// @ts-nocheck

import __uniquid from '../string/uniqid';
import __deepMerge from '../object/deepMerge';
import { spawn as __spawn } from 'child_process';
import __SPromise from '../promise/SPromise';
import ISPromise from '../promise/interface/ISPromise';
import __SIpcServer from '../ipc/SIpcServer';
import __onProcessExit from './onProcessExit';

import ISpawn, { ISpawnSettings } from './interface/ISpawn';

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
const fn: ISpawn = function spawn(
  command: string,
  args: string[] = [],
  settings: ISpawnSettings = {}
): ISPromise {
  let uniquid = `SIpc.spawn.${__uniquid()}`;
  let childProcess;
  let ipcServer,
    serverData,
    isCancel = false;

  const promise = new __SPromise(async (resolve, reject, trigger, cancel) => {
    settings = __deepMerge(
      {
        ipc: true
      },
      settings
    );

    if (settings.ipc === true) {
      ipcServer = await __SIpcServer.getGlobalServer();
      ipcServer.on(`${uniquid}.*`, (data, metas) => {
        trigger(metas.stack.replace(uniquid + '.', ''), data);
      });
    }

    const stderr = [],
      stdout = [];

    let envIpc = {};
    if (ipcServer !== undefined) {
      envIpc = {
        S_IPC_SERVER: JSON.stringify(ipcServer.connexionParams),
        S_IPC_SPAWN_ID: uniquid
      };
    }

    childProcess = __spawn(command, [], {
      shell: true,
      ...settings,
      env: {
        ...process.env,
        CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
          ? process.env.CHILD_PROCESS_LEVEL + 1
          : 1,
        IS_CHILD_PROCESS: true,
        ...(settings.env || {}),
        ...envIpc
      }
    });

    __onProcessExit(() => {
      childProcess.kill();
    });

    trigger('start');

    // listen for errors etc...
    if (childProcess.stdout) {
      childProcess.stdout.on('data', (data) => {
        console.log('da', data.toString());
        stdout.push(data.toString());
        trigger('log', data.toString());
      });
    }
    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data) => {
        console.log('DDDDDDD', data.toString());
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
      } else if (!code && signal) {
        trigger('close.killed');
        reject();
      } else if (code === 0 && !signal) {
        trigger('close.success');
        resolve();
      } else {
        trigger('close.error');
        reject();
      }
    });
  });

  // handle cancel
  promise.on('cancel', async () => {
    if (ipcServer !== undefined) {
      ipcServer.stop();
    }
    if (childProcess !== undefined) {
      childProcess.kill();
    }
  });

  return promise;
};
export = fn;
