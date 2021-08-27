import __childProcess from 'child_process';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __fs from 'fs';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';

/**
 * @name            execPhp
 * @namespace       node.php
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * This function allows you to execute quickly and efficiently some php
 * from nodejs.
 * Note that you MUST have php installed on your system and available a global command.
 *
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IExecPhpSettings {
    encryptParams: boolean;
    paramsThroughFile: boolean;
}

export default function execPhp(scriptPath: string, params: any, settings?: Partial<IExecPhpSettings>) {
    return new Promise((resolve, reject) => {
        settings = {
            encryptParams: false,
            paramsThroughFile: false,
            ...(settings ?? {}),
        };
        let paramsFilePath, paramsStr;

        if (settings.encryptParams) {
            paramsStr = __base64.encrypt(paramsStr);
        } else if (settings.paramsThroughFile) {
            paramsFilePath = `${__packageTmpDir()}/exec-php-${__uniqid()}.json`;
            __writeJsonSync(paramsFilePath, params);
        }

        const result = __childProcess.spawnSync(`php ${scriptPath} '${paramsFilePath ?? paramsStr}'`, [], {
            shell: true,
        });

        if (result.stderr.toString()) {
            return reject(result.stderr.toString());
        }

        resolve(result.stdout.toString());
    });
}
