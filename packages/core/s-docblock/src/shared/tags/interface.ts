// @ts-nocheck

import __filename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __path from 'path';

/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
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

    // if (stringArray[1]) prop = stringArray[1].trim();

    const potentialPath = __path.resolve(__folderPath(blockSettings.filepath), name);

    if (__fs.existsSync(potentialPath)) {
        name = __filename(name).split('.').slice(0, -1)[0];
        relPath = __path.relative(__packageRoot(), potentialPath);
        path = potentialPath;
        // const interface = (await import(potentialPath)).default;
        // return interface.toObject();
    }

    return {
        name,
        path,
        relPath,
    };
}
