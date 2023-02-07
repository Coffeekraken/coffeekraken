// @ts-nocheck

import __SDuration from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import type { ISPromise } from '@coffeekraken/s-promise';
import __SPromise from '@coffeekraken/s-promise';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import { spawn as __spawn, SpawnOptions } from 'child_process';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name            spawn
 * @namespace            node.process
 * @type            Function
 * @async
 * @platform        node
 * @status          wip
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
 * import { __spawn } from '@coffeekraken/sugar/process';
 * const pro = __spawn('echo "hello world");
 * pro.on('close', () => {
 *   console.log('closed');
 * });
 * console.log(await pro);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISpawnSettings extends SpawnOptions {
    pipeEvents: boolean;
    returnValueOnly: boolean;
    silent: boolean;
    [key: string]: any;
}

const _nativeLog = console.log;

export interface ISpawn {
    (
        command: string,
        args?: string[],
        settings?: Partial<ISpawnSettings>,
    ): ISPromise;
}

export default function spawn(
    command: string,
    args?: string[] = [],
    settings?: Partial<ISpawnSettings>,
): __SPromise {
    let childProcess;
    const promise = new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        settings = __deepMerge(
            {
                pipeEvents: true,
                returnValueOnly: false,
            },
            settings ?? {},
        );

        const duration = new __SDuration();
        let resolveValue: any, rejectValue: any;

        const stderr = [],
            stdout = [];

        // replace tokens using the SSugarCli replaceTokens function
        // command = replaceCommandTokens(command);
        const eventEmitter = await __SEventEmitter.ipcServer();
        pipe(eventEmitter);

        childProcess = __spawn(command, [], {
            shell: true,
            stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
            // stdio: 'inherit',
            // detached: true,
            maxBuffer: 1024 * 1024 * 50,
            cwd: settings.cwd || process.cwd(),
            ...settings,
            env: {
                ...process.env,
                ...(settings.env || {}),
                CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1,
                // @todo        Check if this needed or not...
                // NODE_ENV: __isTestEnv() ? 'development' : process.env.NODE_ENV,
                IS_CHILD_PROCESS: true,
            },
        });

        let childProcessExitPromiseResolve;

        childProcess.on('message', (data) => {
            if (data.command) {
                switch (data.command) {
                    case 'chdir':
                        console.log(
                            `<yellow>[spawn]</yellow> Changing working directory to "<cyan>${data.args}</cyan>"`,
                        );
                        process.chdir(data.args);
                        break;
                    default:
                        throw new Error(
                            `<red>spawn</red> Sorry but the passed "<yellow>${data.command}</yellow>" is not supported...`,
                        );
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
                console.log(
                    `<red>[kill]</red> Gracefully killing child process "<cyan>${command}</cyan>"`,
                );
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
            if (isEnded) return;
            isEnded = true;

            // build and parse the value if possible
            let value = resolveValue ?? rejectValue ?? undefined;
            try {
                value = JSON.parse(value);
            } catch (e) {}

            // build the result object
            const resultObj = {
                code,
                signal,
                value,
                stdout,
                stderr,
                spawn: true,
                ...duration.end(),
            };
            if (resultObj.value === undefined) {
                delete resultObj.value;
            }

            // closed by this process
            childProcessExitPromiseResolve?.();

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
    }, {});

    return promise;
}
