// // @ts-nocheck

import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fs from 'fs';
import __path from 'path';

/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
 * @async
 * @platform            node
 * @platform            ts
 * @status              wip
 *
 * Parse the interface tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default async function interfaceTag(data, blockSettings) {
    const stringArray = data.value.trim().split(/(?<=^\S+)\s/);

    let name = stringArray[0],
        path,
        relPath;

    const potentialPath = __path.resolve(__folderPath(blockSettings.filepath), name);

    if (__fs.existsSync(potentialPath)) {
        const int = await import(potentialPath);
        return int.default.toObject();
    }

    return {
        name,
        path,
        relPath,
    };
}
