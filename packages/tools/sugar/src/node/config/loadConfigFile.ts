import __fs from 'fs';
import __path from 'path';
import __yaml from 'yaml';
import __packageRoot from '../path/packageRoot';

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
 * @param       {String}         filePath           The file path relative to your project root directory
 * @param       {ILoadConfigFileSettings}       [settings={}]       Some settings to configure your file load
 * @return          {Any}                       Return the config js object or undefined
 *
 * @example         js
 * import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
 * await __loadConfigFile('vite.config.js`);
 * await __loadConfigFile(`tsconfig.json`);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ILoadConfigFileSettings {
    rootDir: string;
    throw: boolean;
}

export default async function loadConfigFile(
    filePath: string | string[],
    settings?: Partial<ILoadConfigFileSettings>,
): Promise<any> {
    const finalSettings: ILoadConfigFileSettings = {
        rootDir: __packageRoot(),
        throw: false,
        ...(settings ?? {}),
    };

    // protect if we are not in a package
    if (!finalSettings.rootDir) {
        return;
    }

    const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
    let finalFilePath;

    for (let i = 0; i < filePathArray.length; i++) {
        if (
            __fs.existsSync(
                __path.resolve(finalSettings.rootDir, filePathArray[i]),
            )
        ) {
            finalFilePath = filePathArray[i];
            break;
        }
    }

    if (finalSettings.throw && !finalFilePath) {
        throw new Error(
            `Sorry but none of the passed config files "${filePathArray.join(
                ',',
            )}" does exists...`,
        );
    } else if (!finalFilePath) return;

    const extension = finalFilePath.split('.').pop();
    let str;
    switch (extension) {
        case 'json':
            return (
                // @ts-ignore
                (
                    await import(
                        __path.resolve(finalSettings.rootDir, finalFilePath),
                        { assert: { type: 'json' } }
                    )
                ).default
            );
            break;
        case 'js':
            return (
                // @ts-ignore
                (
                    await import(
                        __path.resolve(finalSettings.rootDir, finalFilePath)
                    )
                ).default
            );
            break;
        case 'yaml':
        case 'yml':
            str = __fs
                .readFileSync(
                    __path.resolve(finalSettings.rootDir, finalFilePath),
                    'utf8',
                )
                .toString();
            return __yaml.parse(str);
            break;
        default:
            str = __fs
                .readFileSync(
                    __path.resolve(finalSettings.rootDir, finalFilePath),
                    'utf8',
                )
                .toString();
            // try to pass result in JSON.parse
            try {
                str = JSON.parse(str);
            } catch (e) {}
            return str;
            break;
    }
}
