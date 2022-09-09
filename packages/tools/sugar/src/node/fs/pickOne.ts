import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __micromatch from 'micromatch';

/**
 * @name            pickOne
 * @namespace       node.fs
 * @type            Function
 * @status          beta
 * @platform        node
 *
 * This function allows you to specify multiple files to check and pick one of them
 *
 * @param       {String[]}      filesNames          The names of the files you want to check
 * @param       {IPickOneSettings}       [settings={}]       An object of settings to configure your research
 * @return     {SFile|String}                   Either an SFile instance if set in the config, or the path of the file found
 *
 * @setting         {String}        [cwd=process.cwd()]       The current working directory to search in
 * @setting         {Boolean}         [SFile=true]          Return an SFile instance if true, otherwise just a simple path string
 *
 * @example         js
 * import { __pickOne } from '@coffeekraken/sugar/fs';
 * __pickOne(['myCoolFile.json', 'myCoolFile2.json'], {});
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPickOneSettings {
    cwd: string;
    SFile: boolean;
}

export default function __pickOne(
    filesNames: string[],
    settings?: Partial<IPickOneSettings>,
): __SFile | string {
    const finalSettings: IPickOneSettings = {
        cwd: process.cwd(),
        SFile: true,
        ...(settings ?? {}),
    };
    // check if we have a file
    const files = __fs.readdirSync(finalSettings.cwd);
    for (const fileName of files) {
        if (__micromatch.isMatch(fileName, filesNames)) {
            if (finalSettings.SFile) {
                return new __SFile(fileName, {
                    cwd: finalSettings.cwd,
                });
            } else {
                return `${finalSettings.cwd}/${fileName}`;
            }
        }
    }
}
