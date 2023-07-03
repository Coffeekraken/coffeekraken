"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMap_1 = __importDefault(require("../object/deepMap"));
const parse_1 = __importDefault(require("../string/parse"));
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
    const autoCastedValue = (0, parse_1.default)(typeStr);
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
function __parseTypeString(typeString) {
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
    finalTypes = (0, deepMap_1.default)(finalTypes, ({ object, prop, value, path }) => {
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
exports.default = __parseTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQTBDO0FBQzFDLDREQUFzQztBQXlDdEMsU0FBUyxxQkFBcUIsQ0FBQyxVQUFrQjtJQUM3QyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQ1YsT0FBTyxHQUFXLFVBQVUsRUFDNUIsT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUUzQixlQUFlO0lBQ2YsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pCLE9BQU87WUFDSCxJQUFJLEVBQUUsUUFBUTtZQUNkLEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1NBQzdELENBQUM7S0FDTDtJQUNELGVBQWU7SUFDZixNQUFNLGVBQWUsR0FBRyxJQUFBLGVBQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxPQUFPO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLEtBQUssRUFBRSxlQUFlO1NBQ3pCLENBQUM7S0FDTDtJQUVELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV4RSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdkMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFH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