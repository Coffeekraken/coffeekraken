// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import { spawn as __spawn } from 'child_process';
import __SPromise from '../promise/SPromise';
import ISPromise from '../promise/interface/ISPromise';
import __SIpcServer from '../ipc/SIpcServer';

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
  return new __SPromise(async (resolve, reject, trigger, cancel) => {
    settings = __deepMerge(
      {
        ipc: true
      },
      settings
    );

    let ipcServer, serverData;
    if (settings.ipc === true) {
      ipcServer = new __SIpcServer();
      serverData = await ipcServer.start();
      ipcServer.on('*', (data, metas) => {
        trigger(metas.stack, data);
      });
    }

    const stderr = [],
      stdout = [];

    const childProcess = __spawn(command, [], {
      shell: true,
      ...settings,
      env: {
        ...(settings.env || {}),
        S_IPC_SERVER: JSON.stringify(serverData)
      }
    });

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
      } else if (!code && signal) {
        trigger('kill');
      } else if (code === 0 && !signal) {
        resolve();
      } else {
        reject();
      }
    });

    // handle cancel
    // this.on('cancel', () => {
    //   childProcess.kill();
    // });
  });
};
export = fn;
