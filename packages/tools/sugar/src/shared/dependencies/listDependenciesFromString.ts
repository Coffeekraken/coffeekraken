/**
 * @name          listDependenciesFromString
 * @namespace            shared.dependencies
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function takes a string as input, usually a javascript (js, ts) file content,
 * and returns you an array of all the dependencies found in it.
 *
 * @param       {String}        str            The string to extract dependencies from
 * @param       {IListDependenciesFromStringSettings}        [settings={}]       Some settings to configure your extraction process
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

export interface IListDependenciesFromStringSettings {
    jsImport: boolean;
    jsRequire: boolean;
}

export default function __listDependenciesFromString(
    str: string,
    settings?: IListDependenciesFromStringSettings,
): string[] {
    const es6ImportsReg = /\s?from\s?[',"](.*)[',"]/gm,
        es6DynamicImportsReg = /\simport\([',"](.*)[',"]\)/gm,
        cjsRequireReg = /\srequire\([',"](.*)[',"]\)/gm;

    const dependencies: string[] = [];

    function processDep(dep: string) {
        // do not take in consideration dependencies that
        // are relative to the current file
        if (dep.match(/^\./)) {
            return;
        }
        // handle organisation dependencies starting with a @
        if (dep.match(/^@/)) {
            const parts = dep.split('/');
            if (parts.length < 2) {
                return;
            }
            const d = parts.slice(0, 2).join('/');
            !dependencies.includes(d) && dependencies.push(d);
            return;
        }
        // handle normal dependencies
        const parts = dep.split('/');
        !dependencies.includes(parts[0]) && dependencies.push(parts[0]);
    }

    const es6ImportsMatches = str.matchAll(es6ImportsReg);
    for (const match of es6ImportsMatches) {
        match?.[1] && processDep(match[1]);
    }

    const es6DynamicImportsMatches = str.matchAll(es6DynamicImportsReg);
    for (const match of es6DynamicImportsMatches) {
        match?.[1] && processDep(match[1]);
    }

    const cjsRequireMatches = str.matchAll(cjsRequireReg);
    for (const match of cjsRequireMatches) {
        match?.[1] && processDep(match[1]);
    }

    return dependencies;
}
