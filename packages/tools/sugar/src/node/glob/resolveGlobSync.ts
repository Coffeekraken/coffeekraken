// @ts-nocheck

import __SFile from '@coffeekraken/s-file';

import __excludedGlobs from './excludedGlobs.js';

import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob.js';
import __deepMerge from '../../shared/object/deepMerge.js';

/**
 * @name            resolveGlobSync
 * @namespace            node.glob
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
 * @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
 * @return      {SFile[]|String[]}                                  An array of SFile instances or an array of string if is a folder
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo          document the special ":" syntax available
 *
 * @snippet         __resolveGlobSync($1)
 *
 * @example         js
 * import { __resolveGlobSync } from '@coffeekraken/sugar/glob';
 * __resolveGlobSync('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IResolveGlobSettings {
    cwd: string;
    symlinks: boolean;
    nodir: boolean;
    contentRegExp: RegExp;
    SFile: boolean;
    exclude: string | string[];
    defaultExcludes: boolean;
}

export default function __resolveGlobSync(
    globs: string | string[],
    settings: Partial<IResolveGlobSettings> = {},
): __SFile[] | string[] {
    settings = __deepMerge(
        {
            cwd: settings.cwd || process.cwd(),
            symlinks: true,
            nodir: true,
            contentRegExp: undefined,
            SFile: true,
            exclude: [],
            defaultExcludes: true,
        },
        settings,
    );

    const filesArray: __SFile[] | string[] = [];

    if (!Array.isArray(globs)) globs = [globs];

    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];

        let cwd = settings.cwd,
            globPattern,
            searchReg = settings.contentRegExp;

        // make sure it's a glob pattern
        if (__fs.existsSync(glob)) {
            if (settings.SFile) {
                const sFile = __SFile.new(glob, {
                    cwd,
                });
                filesArray.push(sFile);
            } else {
                filesArray.push(glob);
            }
            continue;
        }

        const splits = glob.split(':').map((split) => {
            return split.replace(`${cwd}/`, '').replace(cwd, '');
        });
        if (splits[1]) {
            // searchReg = __toRegex(splits[1]);

            const innerReg = splits[1]
                .replace(/^\//, '')
                .replace(/\/[a-zA-Z]{0,10}$/, '');
            let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
            if (flags) {
                flags = flags[0].replace('/', '');
            }
            searchReg = new RegExp(innerReg, flags ?? '');
        }
        globPattern = splits[0];

        globPattern = __path.resolve(cwd, globPattern);
        const finalPatterns = __expandGlob(globPattern);

        let pathes = [];
        finalPatterns.forEach((pattern) => {
            pathes = pathes.concat(
                __glob.sync(pattern, {
                    cwd,
                    nodir: settings.nodir,
                    dot: true,
                    follow: settings.symlinks,
                    ignore: [
                        ...(settings.exclude ?? []),
                        ...(settings.defaultExcludes ? __excludedGlobs() : []),
                    ],
                    ...settings,
                }),
            );
        });

        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                try {
                    const content = __fs.readFileSync(path, 'utf8').toString();

                    const matches = content.match(searchReg);

                    if (matches && matches.length) {
                        return true;
                    }
                    return false;
                } catch (e) {
                    return false;
                }
            });
        }

        pathes.forEach((path) => {
            if (settings.SFile) {
                const sFile = __SFile.new(path, {
                    cwd,
                });
                filesArray.push(sFile);
            } else {
                filesArray.push(path);
            }
        });
    }

    // resolve the promise
    return filesArray;
}
