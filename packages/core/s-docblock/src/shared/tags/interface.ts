// // @ts-nocheck

import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fs from 'fs';
import __path from 'path';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';

/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
 * @async
 * @platform            node
 * @status              beta
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

    let stringArray: string[] = [];

    if (data.value === true) {
        stringArray = [__fileName(blockSettings.filepath),'default'];
        if (blockSettings.filepath.match(/\.ts$/)) {
            return;
        }
    } else {
       stringArray = data.value.trim().split(/(?<=^\S+)\s/);
    }

    let path = stringArray[0],
        importName = stringArray[1] ? stringArray[1].trim() : 'default';

    const potentialPath = __checkPathWithMultipleExtensions(
        __path.resolve(__folderPath(blockSettings.filepath), path),
        ['js'],
    );

    if (!potentialPath) return;

    const int = await import(potentialPath);


    const interfaceObj = int[importName].toObject();

    interfaceObj.definition = __deepMap(interfaceObj.definition, ({object, prop, value}) => {
        if (typeof value === 'string') {
            const newValue = new String(value);
            // @ts-ignore
            newValue.render = true;
            return newValue;
        }
        return value;
    });

    return interfaceObj;
}
