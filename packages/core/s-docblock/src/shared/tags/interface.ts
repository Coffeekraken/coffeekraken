// // @ts-nocheck

import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fs from 'fs';
import __path from 'path';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';

/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
 * @async
 * @platform            node
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
        importName = stringArray[1] ? stringArray[1].trim() : 'default',
        path,
        relPath;

    const potentialPath = __checkPathWithMultipleExtensions(
        __path.resolve(__folderPath(blockSettings.filepath), name),
        ['js'],
    );

    if (!potentialPath) return {};

    const int = await import(potentialPath);
    return int[importName].toObject();
}
