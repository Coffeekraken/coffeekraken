// @ts-nocheck

import __uniquid from '../../shared/string/uniqid';
import __deepMerge from '../../shared/object/deepMerge';
import { spawn as __spawn, SpawnOptions } from 'child_process';
import __SPromise, { ISPromise } from '@coffeekraken/s-promise';
import __onProcessExit from './onProcessExit';
import __SDuration from '@coffeekraken/s-duration';
import __isTestEnv from '../../shared/is/testEnv';

/**
 * @name            spawn
 * @namespace       sugar.node.process
 * @type            Function
 * @async
 * @status              wip
 *
 * This function allows you to spawn a new child process just like the native ```spawn``` node function
 * but add the support for SEventEmitter communication layers
 *
 * @param       {String}          command         The command to spawn
 * @param       {String[]}        [args=[]]       Some string arguments to use in the command
 * @param       {ISpawnSettings}    [settings={}]     An object of settings to configure your spawn process
 * @return      {SPromise}                        An SPromise instance that will be resolved or rejected with the command result, and listen for some "events" emited like "close", etc...
 *
 * @setting     {Any}           ...SpawnOptions     All the supported ```spawn``` options. see: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 *
 * @event       data        emited when some data have been pushed in the child process like console.log, etc...
 * @event       error       emited when an error has occured in the child process
 * @event       close       emited when the child process has been closed for whatever reason
 * @event       close.error     emited when the child process has been closed due to an error
 * @event       close.cancel      emited when the child process has been closed due to the call of the ```cancel``` method
 * @event       close.kill      emited when the child process has been closed due to a kill call
 * @event       close.success   emited when the child process has been closed after a successfull execution
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
export interface ISpawnSettings extends SpawnOptions {
  pipeEvents: boolean;
  returnValueOnly: boolean;
  [key: string]: any;
}

export interface ISpawn {
  (
    command: string,
    args?: string[],
    settings?: Partial<ISpawnSettings>
  ): ISPromise;
}

export default function spawn(
  command: string,
  args?: string[] = [],
  settings?: Partial<ISpawnSettings>
): __SPromise {
  let childProcess;

  const promise = new __SPromise(async ({ resolve, reject, emit }) => {
    settings = __deepMerge(
      {
        pipeEvents: true,
        returnValueOnly: false
      },
      settings ?? {}
    );

    const duration = new __SDuration();
    let resolveValue: any, rejectValue: any;

    const stderr = [],
      stdout = [];

    childProcess = __spawn(command, [], {
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      cwd: settings.cwd || process.cwd(),
      ...settings,
      env: {
        ...process.env,
        ...(settings.env || {}),
        CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
          ? process.env.CHILD_PROCESS_LEVEL + 1
          : 1,
        NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV,
        IS_CHILD_PROCESS: true
      }
    });

    __onProcessExit(() => {
      childProcess.kill();
    });

    // handle the process.send pattern
    if (settings.pipeEvents) {
      childProcess.on('message', (dataObj) => {
        if (!dataObj.value || !dataObj.metas) return;
        if (dataObj.metas.event === 'resolve') {
          resolveValue = dataObj.value;
          childProcess.kill('SIGINT');
        } else if (dataObj.metas.event === 'reject') {
          rejectValue = dataObj.value;
          childProcess.kill('SIGINT');
        } else {
          emit(dataObj.metas.event, dataObj.value, dataObj.metas);
        }
      });
    }

    // listen for errors etc...
    if (childProcess.stdout) {
      childProcess.stdout.on('data', (data) => {
        if (!data) return;
        stdout.push(data.toString());
        emit('log', {
          value: data.toString()
        });
      });
    }
    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data) => {
        if (!data) return;
        stderr.push(data.toString());
        emit('error', {
          value: data.toString()
        });
      });
    }

    let isEnded = false;
    childProcess.on('close', (code, signal) => {
      if (isEnded) return;
      isEnded = true;

      // build the result object
      const resultObj = {
        code,
        signal,
        value:
          resolveValue ||
          rejectValue ||
          `${stdout.toString()}\n${stderr.toString()}`,
        stdout,
        stderr,
        spawn: true,
        ...duration.end()
      };

      // generic close event
      emit('close', resultObj);

      // handle resolve and reject
      if (resolveValue) {
        emit('close.success', resultObj);
        if (settings.returnValueOnly) return resolve(resultObj.value);
        return resolve(resultObj);
      } else if (rejectValue) {
        emit('close.error', resultObj);
        if (settings.returnValueOnly) return reject(resultObj.value);
        return reject(resultObj);
      }

      // handle other cases
      if (stderr.length) {
        emit('close.error', resultObj);
        if (settings.returnValueOnly) return reject(resultObj.value);
        return reject(resultObj);
      } else if (!code && signal) {
        emit('close.killed', resultObj);
        if (settings.returnValueOnly) return resolve(resultObj.value);
        return resolve(resultObj);
      } else if (code === 0 && !signal) {
        emit('close.success', resultObj);
        if (settings.returnValueOnly) return resolve(resultObj.value);
        return resolve(resultObj);
      } else {
        emit('close.error', resultObj);
        if (settings.returnValueOnly) return reject(resultObj.value);
        return reject(resultObj);
      }
    });
  });

  return promise;
}
