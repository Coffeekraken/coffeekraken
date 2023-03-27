import { __deepMap } from '@coffeekraken/sugar/object';
import { __parse } from '@coffeekraken/sugar/string';
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
    const autoCastedValue = __parse(typeStr);
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
    //     if (typeof __parse(of) !== 'string') {
    //         console.log('NO string', of);
    //     }
    // });
    // values = typeString.split(/\|/).map((v) => __parse(v));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUF5Q3JELFNBQVMscUJBQXFCLENBQUMsVUFBa0I7SUFDN0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUNWLE9BQU8sR0FBVyxVQUFVLEVBQzVCLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFM0IsZUFBZTtJQUNmLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN6QixPQUFPO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztTQUM3RCxDQUFDO0tBQ0w7SUFDRCxlQUFlO0lBQ2YsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLElBQUksT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO1FBQ3JDLE9BQU87WUFDSCxJQUFJLEVBQUUsUUFBUTtZQUNkLEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFLGVBQWU7U0FDekIsQ0FBQztLQUNMO0lBRUQsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXhFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN2QyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFD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