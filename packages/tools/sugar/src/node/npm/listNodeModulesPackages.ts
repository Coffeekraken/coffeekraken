import __fs from 'fs';
import __glob from 'glob-all';
import __unique from '../../shared/array/unique';
import __packageRootDir from '../path/packageRootDir';

/**
 * @name        listNodeModulesPackages
 * @namespace     node.npm
 * @type        Function
 * @platform        node
 * @status          beta
 *
 * This function list all the packages that are installed in the node_modules folder(s).
 * You can specify that you want either the current package node_modules folder listed,
 * and the root node_modules folder for monorepo as well.
 *
 * @param       {IListNodeModulesPackagesSettings}      [settings={}]       Specify some settings for your listing process
 * @return      {Record<string, IPackageJson}            An object containing each modules under the module name as key
 *
 * @snippet         __listNodeModulesPackages()
 *
 * @example         js
 * import { __listNodeModulesPackages } from '@coffeekraken/sugar/npm';
 * __listNodeModulesPackages();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IListNodeModulesPackagesSettings {
    pathes: string[];
    monorepo: boolean;
}

export default function listNodeModulesPackages(
    settings?: Partial<IListNodeModulesPackagesSettings>,
): Record<string, any> {
    const finalSettings = <IListNodeModulesPackagesSettings>{
        pathes: [`${__packageRootDir()}/node_modules`],
        monorepo: false,
        ...(settings ?? {}),
    };

    if (finalSettings.monorepo) {
        finalSettings.pathes.push(
            `${__packageRootDir(process.cwd(), {
                highest: true,
            })}/node_modules`,
        );
    }

    const finalPaths: string[] = [];

    finalSettings.pathes.forEach((path) => {
        finalPaths.push(`${path}/*/package.json`);
        finalPaths.push(`${path}/*/*/package.json`);
    });

    finalSettings.pathes = __unique(finalSettings.pathes);

    const finalPackagesList = {};

    __glob.sync(finalPaths).forEach((path) => {
        let packageJson;
        try {
            packageJson = JSON.parse(__fs.readFileSync(path, 'utf8'));
        } catch (e) {
            console.log(path.toUpperCase());
            console.log(e);
        }
        if (packageJson) {
            if (!finalPackagesList[packageJson.name]) {
                finalPackagesList[packageJson.name] = packageJson;
            }
        }
    });

    return finalPackagesList;
}
