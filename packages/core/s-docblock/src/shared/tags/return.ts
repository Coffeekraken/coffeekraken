// @ts-nocheck

import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __resolveTypeString from '@coffeekraken/sugar/node/type/resolveTypeString';

/**
 * @name              return
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the return tag
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
async function returnTag(data, blockSettings) {
    const stringArray = data.value.split(/\s{2,20000}/).map((l) => l.trim());

    let type = stringArray && stringArray[0] ? stringArray[0] : null;

    type = await __resolveTypeString(type);

    const description = new String(stringArray[1] ? stringArray[1].trim() : '');
    description.render = true;

    return {
        type,
        description,
    };
}
export default returnTag;
