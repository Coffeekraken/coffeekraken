import __autoCast from '../string/autoCast';

/**
 * @name            parseTypeString
 * @namespace       shared.type
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining this type string
 *
 * @param     {String}        typeString      The type string to parse
 * @return    {ITypeStringObject[]}             An array of object(s) describing the type string passed
 *
 * @example       js
 * import __parseTypeString from '@coffeekraken/sugar/shared/type/parseTypeString';
 * parseTypeString('string|number');
 * //[{
 * //   type: 'string',
 * //   of: undefined,
 * //}, {
 * //   type: 'number',
 * //   of: undefined,
 * //}]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface ITypeStringObject {
    type: string;
    of: string[] | undefined;
    value?: any;
}

export interface IParseTypeStringSingleResultObj {}

function parseSingleTypeString(typeString: string): ITypeStringObject {
    let ofStr = '',
        typeStr: string = typeString,
        ofTypes: string[] = [];

    // string value
    if (typeStr.match(/^['"`]/)) {
        return {
            type: 'string',
            of: undefined,
            value: typeStr.replace(/^['"`]/, '').replace(/['"`]$/, ''),
        };
    }
    // number value
    const autoCastedValue = __autoCast(typeStr);
    if (typeof autoCastedValue === 'number') {
        return {
            type: 'number',
            of: undefined,
            value: autoCastedValue,
        };
    }

    // handle type<...>
    typeStr = typeStr.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, 'array<$1>');

    const ofPartsString = typeStr.match(/<(.+)>$/gm);
    if (ofPartsString && ofPartsString.length) {
        ofStr = ofPartsString[0].replace('<', '').replace('>', '');
    }
    if (ofStr !== '') {
        typeStr = typeStr.replace(`<${ofStr}>`, '');
    }
    // handle the "of" part
    // @ts-ignore
    ofTypes = ofStr !== '' ? [ofStr] : undefined;
    if (ofStr !== undefined && ofStr.includes('|')) {
        ofTypes = ofStr.split('|').map((t) => t.trim());
    }

    // values in "of"
    // ofStr.split('|').forEach((of) => {
    //     if (typeof __autoCast(of) !== 'string') {
    //         console.log('NO string', of);
    //     }
    // });
    // values = typeString.split(/\|/).map((v) => __autoCast(v));

    const result = {
        type: typeStr,
        of: ofTypes,
    };
    // @ts-ignore
    Object.defineProperty(result, 'toString', {
        get() {
            return () => typeString;
        },
    });
    return result;
}
export default function parseTypeString(
    typeString: string,
): ITypeStringObject[] {
    const originalTypeString = typeString;

    typeString = typeString.trim();

    // remove starting { and ending }
    typeString = typeString.replace(/^\{/, '').replace(/\}$/, '');

    let isArray = false;
    if (typeString.match(/\)\[\]$/)) {
        isArray = true;
        typeString = typeString.replace(/\)\[\]$/, '').replace(/^\(/, '');
    }

    const firstTypes: any[] = [];
    let inSubLevel = 0,
        typeStr = '',
        areSubLevels = false;
    // split types
    for (let i = 0; i < typeString.length; i++) {
        const char = typeString[i];
        if (['(', '<'].includes(char)) {
            inSubLevel++;
            areSubLevels = true;
            typeStr += '^';
        } else if ([')', '>'].includes(char)) {
            inSubLevel--;
            typeStr += '$';
            // typeStr += char;
        } else if (char === '|' && inSubLevel === 0) {
            firstTypes.push({
                areSubLevels,
                type: typeStr,
            });
            typeStr = '';
        } else {
            typeStr += char;
        }
        if (inSubLevel < 0) {
            throw new Error(
                `It seems that your type string "${typeString}" is not valid...`,
            );
        }
    }
    firstTypes.push({
        areSubLevels,
        type: typeStr,
    });

    let finalTypes: IParseTypeStringSingleResultObj[] = [];
    firstTypes.forEach((type) => {
        if (type.areSubLevels) {
            finalTypes = [...finalTypes, ...parseTypeString(type.type)];
        } else {
            finalTypes.push(
                parseSingleTypeString(
                    type.type.replace('^', '<').replace('$', '>'),
                ),
            );
        }
    });

    if (isArray) {
        const result = [
            {
                type: 'array',
                of: finalTypes,
            },
        ];
        // @ts-ignore
        result.__proto__.toString = () => originalTypeString;
        // @ts-ignore
        return result;
    }
    // @ts-ignore
    Object.defineProperty(finalTypes, 'toString', {
        get() {
            return () => originalTypeString;
        },
    });
    // @ts-ignore
    return finalTypes;
}
