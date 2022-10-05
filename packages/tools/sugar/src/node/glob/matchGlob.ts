import { __isDirectory } from '@coffeekraken/sugar/is';
import __fs from 'fs';
import __minimatch from 'minimatch';
import __path from 'path';
import __toRegex from 'to-regex';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name            matchGlob
 * @namespace       node.glob
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a file path and a glob pattern that can be an extended one (this mean that is support the listed features above).
 * Then it check if the passed filepath match the passed glob pattern or not and return true or false depending on the result.
 *
 * @feature         Support extended glob syntax like "something/*{1,4}/*"
 * @feature         Support content regex syntax like "something/*:/.+namespace.+/gm"
 *
 * @param       {String}        input            The file path to check
 * @param       {String|String[]}        glob                The glob pattern to check
 * @return      {Boolean}               true if match, false if not
 *
 * @example         js
 * import { __matchGlob } from '@coffeekraken/sugar/glob';
 * __matchGlob('/something/cool.txt', '*\/cool.txt'); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IMatchGlobSettings {
    cwd: string;
    symlinks: boolean;
    nodir: boolean;
}

export default function __matchGlob(
    input,
    glob,
    settings?: Partial<IMatchGlobSettings>,
): boolean {
    settings = __deepMerge(
        {
            cwd: settings?.cwd ?? process.cwd(),
            symlinks: true,
            nodir: true,
        },
        settings ?? {},
    );

    if (Array.isArray(glob)) {
        for (let i = 0; i < glob.length; i++) {
            if (__matchGlob(input, glob[i], settings)) return true;
        }
        return false;
    }

    const splits = glob.split(':');
    const pattern = splits[0]
        .replace(`${settings.cwd}/`, '')
        .replace(settings.cwd, '');
    const regex = splits[1];

    const fullFilePath = __path.resolve(settings.cwd ?? '', input);

    const expandedGlobs = __expandGlob(pattern);

    let hasMatch = false;
    for (let i = 0; i < expandedGlobs.length; i++) {
        const g = expandedGlobs[i];
        if (__minimatch(input, g)) {
            hasMatch = true;
            break;
        }
    }
    if (!hasMatch) return false;

    if (!__fs.existsSync(fullFilePath)) return false;
    if (settings.nodir && __isDirectory(fullFilePath)) return false;

    if (regex) {
        const fileContent = __fs.readFileSync(fullFilePath, 'utf8').toString();
        const regSplits = regex.split('/').splice(1);
        const regString = regSplits[0];
        const flags = regSplits[regSplits.length - 1];
        const searchReg = __toRegex(regString, {
            flags,
        });
        if (!fileContent.match(searchReg)) return false;
    }

    return true;
}
