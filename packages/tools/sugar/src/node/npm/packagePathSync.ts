import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';
import __globalNodeModulesPath from '../npm/globalNodeModulesPath.js';
import __packageRootDir from '../path/packageRootDir.js';

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
 * @snippet         __packagePathSync($1)
 *
 * @example         js
 * import { __packagePathSync } from '@coffeekraken/sugar/npm`;
 * __packagePathSync('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IPackagePathSettings {
    cwd: string;
    monorepo: boolean;
    global: boolean;
}

export default function packagePathSync(
    name: string,
    settings?: Partial<IPackagePathSettings>,
): any {
    const set = <IPackagePathSettings>__deepMerge(
        {
            cwd: process.cwd(),
            monorepo: true,
            global: true,
        },
        settings ?? {},
    );

    let monoDir, globalDir;

    monoDir = `${__packageRootDir(set.cwd, {
        highest: true,
    })}/node_modules`;

    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.cwd}/node_modules/${name}/package.json`)) {
        return __fs.realpathSync(`${set.cwd}/node_modules/${name}`);
    }

    if (
        set.monorepo &&
        monoDir !== settings?.cwd &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)
    ) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }

    globalDir = __globalNodeModulesPath();

    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        return __fs.realpathSync(`${globalDir}/${name}`);
    }
}
