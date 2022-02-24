import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '../../../shared/object/deepMerge';
import __path from 'path';
import __fs from 'fs';

/**
 * @name                packageJson
 * @namespace            node.npm.utils
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package.json JSON content
 *
 * @param       {String}        name        the package name wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @example         js
 * import packageJson from '@coffeekraken/sugar/node/npm/utils/packageJson`;
 * packagrJson('lodash');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface IPackageJsonSettings {
    rootDir: string;
}

export default function packageJson(
    name: string,
    settings?: Partial<IPackageJsonSettings>,
): any {
    const set = <IPackageJsonSettings>__deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
    });

    // check if the package exists
    if (
        !__fs.existsSync(`${set.rootDir}/${name}`) ||
        !__fs.existsSync(`${set.rootDir}/${name}/package.json`)
    ) {
        throw new Error(
            `packageJson: Sorry but the package named "<yellow>${name}</yellow>" from which you try to get the package.json content seems to not exists...`,
        );
    }

    // read the file
    const json = JSON.parse(
        __fs.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'),
    );
    return json;
}
