// @ts-nocheck

import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

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
function returnTag(data, blockSettings) {
    const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
    
    let type =
        stringArray && stringArray[0]
            ? __upperFirst(stringArray[0].replace('{', '').replace('}', ''))
            : null;
    if (type && type.includes('|')) {
        type = type.split('|').map((l) => __upperFirst(l.trim()));
    } else {
        type = [type];
    }

    const description = new String(stringArray[1] ? stringArray[1].trim() : '');
    description.render = true;

    return {
        type,
        description,
    };
}
export default returnTag;
