import __packageRoot from '../path/packageRoot';
import __path from 'path';
import __yaml from 'yaml';
import __fs from 'fs';

/**
 * @name            loadConfigFile
 * @namespace       node.config
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 * @async
 *
 * This function simply load a config file (usually at your project root) and returns his content
 * in object format.
 * This function support these file types:
 * - `.js`: Simple javascript files
 * - `.json`: Simple JSON files
 * - `.yml`: Yaml files
 *
 * @param       {String}         filePath           The file path relative to your project root directory
 * @param       {ILoadConfigFileSettings}       [settings={}]       Some settings to configure your file load
 * @return          {Any}                       Return the config js object or undefined
 *
 * @example         js
 * import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
 * await __loadConfigFile('vite.config.js`);
 * await __loadConfigFile(`tsconfig.json`);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ILoadConfigFileSettings {
    rootDir: string;
    throw: boolean;
}

export default async function loadConfigFile(
    filePath: string | string[],
    settings?: ILoadConfigFileSettings,
): any {
    settings = {
        rootDir: __packageRoot(),
        throw: false,
        ...(settings ?? {}),
    };

    const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
    let finalFilePath;

    for (let i = 0; i < filePathArray.length; i++) {
        if (
            __fs.existsSync(__path.resolve(settings.rootDir, filePathArray[i]))
        ) {
            finalFilePath = filePathArray[i];
            break;
        }
    }

    if (settings.throw && !finalFilePath) {
        throw new Error(
            `Sorry but none of the passed config files "${filePathArray.join(
                ',',
            )}" does exists...`,
        );
    } else if (!finalFilePath) return;

    const extension = finalFilePath.split('.').pop();
    switch (extension) {
        case 'js':
        case 'json':
            return (
                await import(__path.resolve(settings.rootDir, finalFilePath))
            ).default;
            break;
        case 'yml':
            const str = __fs
                .readFileSync(
                    __path.resolve(settings.rootDir, finalFilePath),
                    'utf8',
                )
                .toString();
            return __yaml.parse(str);
            break;
    }
}
