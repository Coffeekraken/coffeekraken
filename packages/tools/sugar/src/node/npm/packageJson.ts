import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import __packageRoot from '../path/packageRoot';
import __globalNodeModulesPath from './globalNodeModulesPath';

/**
 * @name                packageJson
 * @namespace            node.npm
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
 * import packageJson from '@coffeekraken/sugar/node/npm/packageJson`;
 * packagrJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface IPackageJsonSettings {
    rootDir: string;
    monorepo: boolean;
    global: boolean;
}

export default function packageJson(
    name: string,
    settings?: Partial<IPackageJsonSettings>,
): any {
    const set = <IPackageJsonSettings>__deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });

    let json, monoDir, globalDir;

    monoDir = `${__packageRoot(process.cwd(), {
        highest: true,
    })}/node_modules`;

    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
        json = JSON.parse(
            __fs.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'),
        );
        return json;
    }

    if (
        set.monorepo &&
        monoDir !== settings?.rootDir &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)
    ) {
        json = JSON.parse(
            __fs.readFileSync(`${monoDir}/${name}/package.json`, 'utf8'),
        );
        return json;
    }

    globalDir = __globalNodeModulesPath();

    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        json = JSON.parse(
            __fs.readFileSync(`${globalDir}/${name}/package.json`, 'utf8'),
        );
        return json;
    }
}
