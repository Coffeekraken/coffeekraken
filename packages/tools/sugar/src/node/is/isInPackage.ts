// @ts-nocheck

import __readJsonSync from '../fs/readJsonSync';
import __fs from 'fs';
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
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import { __isInPackage } from '@coffeekraken/sugar/is';
 * const root = __isInPackage();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isInPackage(
    name,
    from = process.cwd(),
    highest = false,
) {
    const packageRootDir = __packageRootDir(from);
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
    if (highest) {
        return isInPackage(name, newPath, highest);
    }

    return false;
}
