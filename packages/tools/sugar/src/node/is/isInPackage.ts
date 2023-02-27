// @ts-nocheck

import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';

/**
 * @name                    isInPackage
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {IIsInPackageSettings}      [settings={}]       Some settings to configure your heck
 * @return          {String}                                      The finded package path or false if not finded
 * 
 * @setting           {String}              [cwd=process.cwd()]    Specify from where the research has to be done
 * @setting           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 *
 * @snippet         __isInPackage($1);
 * 
 * @example         js
 * import { __isInPackage } from '@coffeekraken/sugar/is';
 * const root = __isInPackage();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

interface IIsInPackageSettings {
    cwd: string;
    highest: boolean;
}

export default function __isInPackage(
    name,
    settings?: Partial<IIsInPackageSettings>
) {

    const finalSettings: IIsInPackageSettings = {
        cwd: process.cwd(),
        highest: false,
        ...settings ?? {}
    }

    const packageRootDir = __packageRootDir(finalSettings.cwd);
    if (!packageRootDir) return false;

    if (!__fs.existsSync(`${packageRootDir}/package.json`)) return false;
    const pkg = __readJsonSync(`${packageRootDir}/package.json`);

    let names = name;
    if (typeof names === 'string')
        names = names.split(',').map((f) => f.trim());
    for (let i = 0; i < names.length; i++) {
        if (names[i] === pkg.name) {
            return true;
        }
    }

    const newPath = packageRootDir
        .split('/')
        .slice(0, -1)
        // .filter((i) => i !== '')
        .join('/');

    // no package found... check if we need to check higher
    if (finalSettings.highest) {
        return __isInPackage(name, {
            cwd: newPath,
            highest: true
        });
    }

    return false;
}
