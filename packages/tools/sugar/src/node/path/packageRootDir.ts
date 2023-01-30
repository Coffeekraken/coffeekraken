// @ts-nocheck

import { __isFile } from '@coffeekraken/sugar/is';
import { __objectHash } from '@coffeekraken/sugar/object';
import __findPkgJson from 'find-package-json';

/**
 * @name                    packageRootDir
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @feature         Support file path as input
 * @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
 *
 * @setting         {Boolean}           [highest=false]         Specify if you want the highest package possible
 * @setting         {Number}            [upCount=undefined]         Specify a number of packages to go up. Cannot be used alongside the `highest` setting
 * @setting         {String[]}          [requiredProperties=['name','version']]             Specify some required properties that MUST be present in the package.json to be considered as a valid package
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [settings={}]         Some settings to configure the research
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import { __packageRootDir } from '@coffeekraken/sugar/path';
 * const root = __packageRootDir();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPackageRootSettings {
    highest: boolean;
    upCount: number;
    requiredProperties: string[];
}

const __packageRootDirsCache = {};
export default function __packageRootDir(
    from = process.cwd(),
    settings?: Partial<IPackageRootSettings>,
) {
    const finalSettings: IPackageRootSettings = {
        highest: false,
        upCount: undefined,
        requiredProperties: ['name', 'version'],
        ...(settings ?? {}),
    };

    // cache
    const storageKey = __objectHash({
        from,
        ...finalSettings,
    });
    if (!from && __packageRootDirsCache[storageKey]) {
        return __packageRootDirsCache[storageKey];
    }

    if (__isFile(from)) from = from.split('/').slice(0, -1).join('/');

    const f = __findPkgJson(from);
    let file = f.next();

    let finalFile,
        upCountIdx = 0;

    // no file found so return the process cwd
    if (!file || !file.filename) {
        return false;
    }

    while (!file.done) {
        if (file.done) {
            break;
        }

        if (finalSettings.upCount && !finalSettings.highest) {
            if (upCountIdx >= finalSettings.upCount) {
                break;
            }
        }

        if (!finalSettings.highest) {
            // required properties
            if (finalSettings.requiredProperties) {
                let allProps = true;
                finalSettings.requiredProperties.forEach((prop) => {
                    if (!allProps) return;
                    if (file.value[prop] === undefined) allProps = false;
                });
                if (allProps) {
                    upCountIdx++;
                    finalFile = file;
                    if (!finalSettings.upCount) {
                        break;
                    }
                }
            } else {
                upCountIdx++;
                finalFile = file;
                if (!finalSettings.upCount) {
                    break;
                }
            }
        } else {
            finalFile = file;
        }
        file = f.next();
    }

    if (!finalFile) {
        return false;
    }

    const finalPath = finalFile.filename.split('/').slice(0, -1).join('/');
    __packageRootDirsCache[storageKey] = finalPath;
    return finalPath;
}
