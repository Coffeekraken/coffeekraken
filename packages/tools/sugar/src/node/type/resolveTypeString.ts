import __SInterface from '@coffeekraken/s-interface';

import __replaceTokens from '../../shared/token/replaceTokens.js';
import __packageRootDir from '../path/packageRootDir.js';

import __fs from 'fs';
import __path from 'path';
import __parseTypeString, {
    ITypeStringObject,
} from '../../shared/type/parseTypeString.js';

/**
 * @name            resolveTypeString
 * @namespace       node.type
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining the resolved type with interface if defined, etc...
 *
 * @param     {String}        typeString      The type string to parse
 * @param       {Partial<IResolveTypeStringSettings>}       [settings={}]     A setting object to configure your resolve process
 * @return    {Promise<IResolveTypeStringResult>}             A promise resolved once the type string has been resolved
 *
 * @setting         {String}       [cwd=process.cwd()]          The cwd to use to resolve the type string when they are path
 *
 * @snippet         __resolveTypeString($1)
 *
 * @example       js
 * import { __resolveTypeString } from '@coffeekraken/sugar/type';
 * __resolveTypeString('string');
 * // {
 * //    types: [{
 * //       type: 'string',
 * //       of: undefined,
 * //       value: undefined
 * //    }],
 * //    interface: undefined
 * // }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface IResolveTypeStringResult {
    types: ITypeStringObject[];
    interface?: __SInterface;
    raw: string;
}

export interface IResolveTypeStringSettings {
    cwd: string;
}

export default async function __resolveTypeString(
    typeString: string,
    settings: Partial<IResolveTypeStringSettings> = {},
): Promise<IResolveTypeStringResult> {
    const finalSettings: IResolveTypeStringSettings = {
        cwd: process.cwd(),
        ...settings,
    };

    let types, interf;

    if (typeString.match(/^(\.|\/)/)) {
        // resolve tokens
        const path = __replaceTokens(typeString);

        let potentialTypeFilePath;

        if (typeString.match(/^(\.|\/)/)) {
            potentialTypeFilePath = __path.resolve(finalSettings.cwd, path);
        } else {
            potentialTypeFilePath = __path.resolve(
                __packageRootDir(finalSettings.cwd),
                path,
            );
        }

        if (__fs.existsSync(potentialTypeFilePath)) {
            const typeData = (await import(potentialTypeFilePath)).default;
            types = [
                {
                    type: typeData.name ?? types,
                    of: undefined,
                    value: undefined,
                },
            ];
            // save data into the "metas" property on the string directly
            interf = typeData.toObject?.() ?? typeData;
        }
        // regular types
    } else {
        types = __parseTypeString(typeString);
    }

    return {
        types,
        interface: interf,
        raw: typeString.trim().replace(/^\{/, '').replace(/\}$/, ''),
    };
}
