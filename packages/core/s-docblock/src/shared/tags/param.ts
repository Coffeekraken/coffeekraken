// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

/**
 * @name              param
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @param      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function param(data, blockSettings) {
    if (!Array.isArray(data)) data = [data];

    const res = {};

    data.forEach((param) => {
        if (
            typeof param !== 'object' ||
            !param.value ||
            typeof param.value !== 'string'
        )
            return;
        const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
        let type =
            parts && parts[0]
                ? __upperFirst(parts[0].replace('{', '').replace('}', ''))
                : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = new String(parts && parts[2] ? parts[2] : null);
        description.render = true;
        let name = variable;
        let defaultValue = undefined;
        let defaultValueStr = '';
        let variableMatch = null;

        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);

        if (type && type.includes('|')) {
            type = type.split('|').map((l) => __upperFirst(l.trim()));
        } else {
            type = [type];
        }

        if (variableMatch) {
            const variableParts = variableMatch[1].split('=');
            if (variableParts.length === 2) {
                name = variableParts[0].trim();
                defaultValueStr = variableParts[1].trim();
                defaultValue = __parse(variableParts[1].trim());
            }
        }

        res[name] = {
            name,
            type,
            description,
            default: defaultValue,
            defaultStr: defaultValueStr,
        };
        if (param.content) res[name].content = param.content.join('\n');
    });
    return res;
}
export default param;
