import __childProcess from 'child_process';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __fs from 'fs';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';

import __zlib from 'zlib';

/**
 * @name            execPhp
 * @namespace       node.php
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

export default function execPhp(
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

        try {
            result = __childProcess.execSync(
                `php ${scriptPath} "${paramsFilePath ?? paramsStr}"`,
            );
        } catch (e) {
            return reject(e);
        }

        if (paramsFilePath) {
            try {
                __fs.unlinkSync(paramsFilePath);
            } catch (e) {}
        }

        // resolve(`php ${scriptPath} "${paramsFilePath ?? paramsStr}"`);
        resolve(result.toString?.() ?? result);
    });
}
