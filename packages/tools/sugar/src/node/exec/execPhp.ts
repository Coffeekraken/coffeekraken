import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __uniqid } from '@coffeekraken/sugar/string';
import __childProcess from 'child_process';

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
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IExecPhpSettings {
    encryptParams: boolean;
    paramsThroughFile: boolean;
}

export default function __execPhp(
    scriptPath: string,
    params: any,
    settings?: Partial<IExecPhpSettings>,
) {
    return new Promise((resolve, reject) => {
        settings = {
            paramsThroughFile: false,
            ...(settings ?? {}),
        };
        let paramsFilePath, paramsStr;

        if (settings.paramsThroughFile) {
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

        result = __childProcess.exec(
            `php ${scriptPath} "${paramsFilePath ?? paramsStr}"`,
            (error, stdout, stderr) => {
                // if (paramsFilePath) {
                //     try {
                //         // __fs.unlinkSync(paramsFilePath);
                //     } catch (e) {}
                // }

                if (error) {
                    return reject(
                        [
                            stdout.split('\n').slice(-10).join('\n'),
                            error,
                            stderr,
                        ].join('\n'),
                    );
                }
                resolve(stdout);
            },
        );
    });
}
