import __fs from 'fs';
import __glob from 'glob';
import __unique from '../../shared/array/unique.js';
import __listDependenciesFromString from '../../shared/dependencies/listDependenciesFromString.js';
import __isGlob from '../../shared/is/isGlob.js';

/**
 * @name          listDependenciesFromFiles
 * @namespace            node.dependencies
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function takes some globs as input, usually javascript (js, ts) files,
 * read them and returns you an array of all the dependencies found in it.
 *
 * @param       {String|String[]}        glob                   Some glob(s) to read and extract dependencies from
 * @param       {IListDependenciesFromFilesSettings}        [settings={}]       Some settings to configure your extraction process
 * @return      {Array<String>}                     An array of dependencies found
 *
 * @setting         {Boolean}       [jsImport=true]         Specify if you want to extract the import dependencies or not
 * @setting         {Boolean}       [jsRequire=true]        Specify if you want to extract the require dependencies or not
 *
 * @snippet         __currentModuleSystem()
 *
 * @example       js
 * import { __currentModuleSystem } from '@coffeekraken/sugar/module';
 * __currentModuleSystem(); // => 'cjs'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IListDependenciesFromFilesSettings {
    jsImport: boolean;
    jsRequire: boolean;
    cwd: string;
}

export default function __listDependenciesFromFiles(
    glob: string | string[],
    settings?: IListDependenciesFromFilesSettings,
): string[] {
    if (!Array.isArray(glob)) glob = [glob];
    const files = __glob.sync(
        glob
            .map((g) => {
                if (!__isGlob(g)) {
                    return `${g}/**/*.{js,ts,jsx,tsx}`;
                }
                return g;
            })
            .join(','),
        {
            cwd: settings?.cwd ?? process.cwd(),
            nodir: true,
            absolute: true,
        },
    );

    let dependencies: string[] = [];

    for (let [i, filePath] of files.entries()) {
        const content = __fs.readFileSync(filePath).toString();
        const fileDependencies = __listDependenciesFromString(
            content,
            settings,
        );
        dependencies = [...dependencies, ...fileDependencies];
    }

    return __unique(dependencies);
}
