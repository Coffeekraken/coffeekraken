import __deepMap from '../object/deepMap';
import __autoCast from '../string/autoCast';
function parseSingleTypeString(typeString) {
    let ofStr = '', typeStr = typeString, ofTypes = [];
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
export default function __parseTypeString(typeString) {
    const originalTypeString = typeString;
    typeString = typeString.trim();
    // remove starting { and ending }
    typeString = typeString.replace(/^\{/, '').replace(/\}$/, '');
    let isArray = false;
    if (typeString.match(/\)\[\]$/)) {
        isArray = true;
        typeString = typeString.replace(/\)\[\]$/, '').replace(/^\(/, '');
    }
    const firstTypes = [];
    let inSubLevel = 0, typeStr = '', areSubLevels = false;
    // split types
    for (let i = 0; i < typeString.length; i++) {
        const char = typeString[i];
        if (['(', '<'].includes(char)) {
            inSubLevel++;
            areSubLevels = true;
            typeStr += '^';
        }
        else if ([')', '>'].includes(char)) {
            inSubLevel--;
            typeStr += '$';
            // typeStr += char;
        }
        else if (char === '|' && inSubLevel === 0) {
            firstTypes.push({
                areSubLevels,
                type: typeStr,
            });
            typeStr = '';
        }
        else {
            typeStr += char;
        }
        if (inSubLevel < 0) {
            throw new Error(`It seems that your type string "${typeString}" is not valid...`);
        }
    }
    firstTypes.push({
        areSubLevels,
        type: typeStr,
    });
    let finalTypes = [];
    firstTypes.forEach((type) => {
        if (type.areSubLevels) {
            finalTypes = [...finalTypes, ...__parseTypeString(type.type)];
        }
        else {
            finalTypes.push(parseSingleTypeString(type.type.replace('^', '<').replace('$', '>')));
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
    finalTypes = __deepMap(finalTypes, ({ object, prop, value, path }) => {
        if (typeof value === 'string') {
            value = value.replace(/^\./, '').trim();
        }
        return value;
    });
    // @ts-ignore
    Object.defineProperty(finalTypes, 'toString', {
        get() {
            return () => originalTypeString;
        },
    });
    // @ts-ignore
    return finalTypes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBdUM1QyxTQUFTLHFCQUFxQixDQUFDLFVBQWtCO0lBQzdDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFDVixPQUFPLEdBQVcsVUFBVSxFQUM1QixPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTNCLGVBQWU7SUFDZixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekIsT0FBTztZQUNILElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLFNBQVM7WUFDYixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7U0FDN0QsQ0FBQztLQUNMO0lBQ0QsZUFBZTtJQUNmLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxPQUFPO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLEtBQUssRUFBRSxlQUFlO1NBQ3pCLENBQUM7S0FDTDtJQUVELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV4RSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdkMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFF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