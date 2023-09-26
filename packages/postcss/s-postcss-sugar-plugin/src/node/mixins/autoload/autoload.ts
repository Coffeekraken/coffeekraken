import __SInterface from '@coffeekraken/s-interface';
import { __globalNodeModulesPath } from '@coffeekraken/sugar/npm';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __filehound from 'filehound';
import __fs from 'fs';

/**
 * @name          autoload
 * @namespace     node.mixin.autoload
 * @type          PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to autoload all the "autoload.css" files found in the
 * packages installed in the "node_modules" folder.
 * This is usefull to load dependencies css like for the s-appear package, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * \@s.autoload;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginAutoloadMixinInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                type: 'String',
                description: 'Specify a glob of the files you want to autoload',
                default: 'autoload.css',
            },
            depth: {
                type: 'Number',
                description:
                    'Specify the depth of the search relative to the node_modules folder. Higher you set this, slower it will be...',
                default: 4,
            },
        };
    }
}

export interface IPostcssSugarPluginAutoloadMixinParams {
    glob: string;
    depth: number;
}

export { postcssSugarPluginAutoloadMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    getRoot,
    postcssApi,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginAutoloadMixinParams>;
    atRule: any;
    CssVars: any;
    getRoot: Function;
    postcssApi: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginAutoloadMixinParams = {
        glob: 'autoload.css',
        depth: 4,
        ...params,
    };

    const vars = new CssVars();

    const globalNodeModulesPath = __globalNodeModulesPath(),
        monoNodeModulesPath = `${__packageRootDir(process.cwd(), {
            highest: true,
        })}/node_modules`,
        packageNodeModulesPath = `${__packageRootDir()}/node_modules`;

    // build an array with all the folders in which to search for file
    const foldersPaths = [];
    if (__fs.existsSync(packageNodeModulesPath)) {
        foldersPaths.push(packageNodeModulesPath);
    }
    if (__fs.existsSync(monoNodeModulesPath)) {
        foldersPaths.push(monoNodeModulesPath);
    }
    if (__fs.existsSync(globalNodeModulesPath)) {
        foldersPaths.push(globalNodeModulesPath);
    }

    const files = __filehound
        .create()
        .paths(...foldersPaths)
        .ext('css')
        .glob(finalParams.glob)
        .depth(finalParams.depth)
        .findSync();

    if (!files || !files.length) {
        return vars;
    }

    // add the import in the root nodes
    const root = getRoot(atRule);
    files.forEach((filePath) => {
        console.log('ADD', filePath);
        root.nodes.unshift(postcssApi.parse(`@import url("${filePath}");`));
    });

    return vars;
}
