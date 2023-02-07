import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

/**
 * @name            addDependencies
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to just add some dependencies without installing them directly.
 * It just add the dependency into the package.json file
 *
 * @param       {Record<string, string>}           dependencies       Dependencies you want to add
 * @param       {INpmAddDependenciesSettings}           [settings={}]           Some settings to configure your installation
 * @return      {Promise}               A promise resolved when dependencies are added correctly
 *
 * @setting         {String}        [cwd=process.cwd()]         The directory where you want to execute the install
 *
 * @example         js
 * import install from '@coffeekraken/sugar/node/npm/install';
 * await install();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface INpmAddDependenciesSettings {
    cwd: string;
    dev: boolean;
}

export default function addDependencies(
    dependencies: Record<string, string>,
    settings: Partial<INpmAddDependenciesSettings>,
): Promise<any> {
    return new Promise(async (resolve) => {
        settings = {
            cwd: process.cwd(),
            ...settings,
        };

        const packageJson = __packageJsonSync(settings.cwd),
            packageJsonPath = `${__packageRootDir(settings.cwd)}/package.json`;

        if (settings.dev) {
            if (!packageJson.devDependencies) {
                packageJson.devDependencies = dependencies;
            } else {
                packageJson.devDependencies = {
                    ...packageJson.devDependencies,
                    ...dependencies,
                };
            }
        } else {
            if (!packageJson.dependencies) {
                packageJson.dependencies = dependencies;
            } else {
                packageJson.dependencies = {
                    ...packageJson.dependencies,
                    ...dependencies,
                };
            }
        }

        // save the file back
        __fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 4),
        );

        resolve(packageJson);
    });
}
