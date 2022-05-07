// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __path from 'path';
import __SFaviconBuilder from '../../../../../builders/s-favicon-builder/src/node/exports';
import __fs from 'fs';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

/**
 * @name              param
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
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
async function param(data, blockSettings) {
    if (!Array.isArray(data)) data = [data];

    const res = {};

    for (let [i, param] of Object.entries(data)) {
        if (
            typeof param !== 'object' ||
            !param.value ||
            typeof param.value !== 'string'
        )
            return;
        const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
        let type =
            parts && parts[0]
                ? parts[0].replace('{', '').replace('}', '')
                : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = new String(parts && parts[2] ? parts[2] : null);
        description.render = true;
        let name = variable;
        let defaultValue = undefined;
        let defaultValueStr = '';
        let variableMatch = null;
        let metas;

        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);

        if (type && type.includes('|')) {
            type = type.split('|').map((l) => __upperFirst(l.trim()));
        } else {
            type = [type];
        }

        // references interface file
        for (let [idx, t] of Object.entries(type)) {
            // resolve tokens
            t = __replaceTokens(t);

            if (blockSettings.filePath) {
                let potentialTypeFilePath;

                if (t.match(/^(\.|\/)/)) {
                    potentialTypeFilePath = __path.resolve(
                        __path.dirname(blockSettings.filePath),
                        t,
                    );
                } else {
                    potentialTypeFilePath = __path.resolve(
                        __packageRoot(__path.dirname(blockSettings.filePath)),
                        t,
                    );
                }

                if (__fs.existsSync(potentialTypeFilePath)) {
                    const typeData = (await import(potentialTypeFilePath))
                        .default;
                    type = [typeData.name] ?? type;
                    // save data into the "metas" property on the string directly
                    metas = typeData.toObject?.() ?? typeData;
                }
            }
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
            metas,
            description,
            default: defaultValue,
            defaultStr: defaultValueStr,
        };
        if (param.content) res[name].content = param.content.join('\n');
    }

    return res;
}
export default param;
