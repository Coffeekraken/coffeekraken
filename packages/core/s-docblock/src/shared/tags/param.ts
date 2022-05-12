// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __path from 'path';
import __SFaviconBuilder from '../../../../../builders/s-favicon-builder/src/node/exports';
import __fs from 'fs';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __parseTypeString from '@coffeekraken/sugar/shared/type/parseTypeString';

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
        let typeStr = parts && parts[0] ? parts[0] : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = new String(parts && parts[2] ? parts[2] : null);
        description.render = true;
        let name = variable;
        let defaultValue = undefined;
        let defaultValueStr = '';
        let variableMatch = null;
        let interf;
        let type = {
            str: typeStr,
            types: [],
        };

        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);

        // regular types
        if (typeStr.match(/^\{.*\}$/)) {
            const types = __parseTypeString(typeStr);
            type.types = types;
            // path type
        } else if (typeStr.match(/^(\.|\/|[a-zA-Z0-9])/)) {
            // resolve tokens
            const path = __replaceTokens(typeStr);

            if (blockSettings.filePath) {
                let potentialTypeFilePath;

                if (typeStr.match(/^(\.|\/)/)) {
                    potentialTypeFilePath = __path.resolve(
                        __path.dirname(blockSettings.filePath),
                        path,
                    );
                } else {
                    potentialTypeFilePath = __path.resolve(
                        __packageRoot(__path.dirname(blockSettings.filePath)),
                        path,
                    );
                }

                if (__fs.existsSync(potentialTypeFilePath)) {
                    const typeData = (await import(potentialTypeFilePath))
                        .default;
                    type = [typeData.name] ?? type;
                    // save data into the "metas" property on the string directly
                    interf = typeData.toObject?.() ?? typeData;
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
            interface: interf,
            description,
            default: defaultValue,
            defaultStr: defaultValueStr,
        };

        if (param.content) res[name].content = param.content.join('\n');
    }

    console.log(res);

    return res;
}
export default param;
