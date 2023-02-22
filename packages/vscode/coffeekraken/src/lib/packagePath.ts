// @ts-nocheck

import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import __globalNodeModulesPath from './globalNodeModulesPath';

export interface IPackagePathSettings {
    cwd: string;
    monorepo: boolean;
    global: boolean;
}

export default function packagePath(
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
        return `${set.cwd}/node_modules/${name}`;
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
