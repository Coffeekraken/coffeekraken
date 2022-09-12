import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __globalNodeModulesPath from './globalNodeModulesPath';

/**
 * @name                packagePath
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package path
 *
 * @param       {String}        name        the package name wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @example         js
 * import packagePath from '@coffeekraken/sugar/node/npm/packagePath`;
 * packagrJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IPackagePathSettings {
    rootDir: string;
    monorepo: boolean;
    global: boolean;
}

export default function packagePath(
    name: string,
    settings?: Partial<IPackagePathSettings>,
): any {
    const set = <IPackagePathSettings>__deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });

    let monoDir, globalDir;

    monoDir = `${__packageRootDir(process.cwd(), {
        highest: true,
    })}/node_modules`;

    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
        return `${set.rootDir}/${name}`;
    }

    if (
        set.monorepo &&
        monoDir !== settings?.rootDir &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)
    ) {
        return `${monoDir}/${name}`;
    }

    globalDir = __globalNodeModulesPath();

    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        return `${globalDir}/${name}`;
    }
}
