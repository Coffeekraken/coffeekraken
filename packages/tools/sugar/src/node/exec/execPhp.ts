import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __childProcess from 'child_process';
import __fs from 'fs';
import __uniqid from '../../node/string/uniqid.js';
import __deepMerge from '../../shared/object/deepMerge.js';
import __writeJsonSync from '../fs/writeJsonSync.js';
import __packageTmpDir from '../path/packageTmpDir.js';

/**
 * @name            execPhp
 * @namespace       node.exec
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to execute quickly and efficiently some php
 * from nodejs.
 * Note that you MUST have php installed on your system and available a global command.
 *
 * @snippet         __execPhp($1, $2)
 * __execPhp($1, $2).then(result => {
 *      $3
 * });
 *
 * @example         js
 * import { __execPhp } from '@coffeekraken/sugar/exec';
 * await __execPhp('/my/cool/script.php', {
 *    some: 'data'
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IExecPhpLogSettings {
    verbose: boolean;
}

export interface IExecPhpSettings {
    encryptParams: boolean;
    paramsThroughFile: boolean;
    log: Partial<IExecPhpLogSettings>;
}

export default function __execPhp(
    scriptPath: string,
    params: any,
    settings?: Partial<IExecPhpSettings>,
) {
    return new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings: IExecPhpSettings = __deepMerge(
            {
                paramsThroughFile: false,
                log: {
                    verbose: __SEnv.is('verbose'),
                },
            },
            settings ?? {},
        );
        let paramsFilePath, paramsStr;

        const duration = new __SDuration();

        if (finalSettings.paramsThroughFile) {
            paramsFilePath = `${__packageTmpDir()}/exec-php/${__uniqid()}-${Math.round(
                Math.random() * 99999999999,
            )}.json`;
            __writeJsonSync(paramsFilePath, params);
        } else {
            paramsStr = JSON.stringify(params);
            paramsStr = paramsStr
                .replace(/\\n/g, '\\n')
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, '\\&')
                .replace(/\\r/g, '\\r')
                .replace(/\\t/g, '\\t')
                .replace(/\\b/g, '\\b')
                .replace(/\\f/g, '\\f');
        }

        // quicker with execSync than spawnSync
        let result;

        if (finalSettings?.log?.verbose) {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[execPhp]</yellow> Executing php command "<magenta>${`php ${scriptPath} "${
                    paramsFilePath ?? paramsStr
                }"`}</magenta>"`,
            });
        }

        result = __childProcess.exec(
            `php ${scriptPath} "${paramsFilePath ?? paramsStr}"`,
            {
                maxBuffer: 1024 * 1024 * 50,
            },
            (error, stdout, stderr) => {
                if (paramsFilePath) {
                    try {
                        __fs.unlinkSync(paramsFilePath);
                    } catch (e) {}
                }

                if (error) {
                    return reject(
                        [
                            stdout.split('\n').slice(-10).join('\n'),
                            error,
                            stderr,
                        ].join('\n'),
                    );
                }

                if (finalSettings?.log?.verbose) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[execPhp]</green> Command executed <green>successfully</green> in <yellow>${
                            duration.end().formatedDuration
                        }</yellow>`,
                    });
                }

                resolve(stdout);
            },
        );
    });
}
