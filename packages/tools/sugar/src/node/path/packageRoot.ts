// @ts-nocheck

import __findPkgJson from 'find-package-json';
import __isFile from '../is/file';

/**
 * @name                    packageRoot
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
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [settings={}]         Some settings to configure the research
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
 * const root = packageRoot();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPackageRootSettings {
    highest: boolean;
    requiredProperties: string[];
}

function packageRoot(
    from = process.cwd(),
    settings?: Partial<IPackageRootSettings>,
) {
    const finalSettings: IPackageRootSettings = {
        highest: false,
        requiredProperties: ['name', 'version'],
        ...(settings ?? {}),
    };

    if (__isFile(from)) from = from.split('/').slice(0, -1).join('/');

    const f = __findPkgJson(from);
    let file = f.next();

    let finalFile;

    // no file found
    if (!file || !file.filename) return false;

    while (!file.done) {
        if (file.done) break;

        // treat the not highest case
        if (!finalSettings.highest) {
            // required properties
            if (finalSettings.requiredProperties) {
                let allProps = true;
                finalSettings.requiredProperties.forEach((prop) => {
                    if (!allProps) return;
                    if (file.value[prop] === undefined) allProps = false;
                });
                if (allProps) {
                    finalFile = file;
                    break;
                }
            } else {
                finalFile = file;
                break;
            }
        } else {
            finalFile = file;
        }
        file = f.next();
    }

    if (!finalFile) return false;
    return finalFile.filename.split('/').slice(0, -1).join('/');
}
export default packageRoot;
