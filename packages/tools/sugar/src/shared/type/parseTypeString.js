"use strict";
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
function parseSingleTypeString(typeString) {
    let ofStr = '', typeStr = typeString;
    const ofPartsString = typeString.match(/<(.+)>$/gm);
    if (ofPartsString && ofPartsString.length) {
        ofStr = ofPartsString[0].replace('<', '').replace('>', '');
    }
    if (ofStr !== '') {
        typeStr = typeStr.replace(`<${ofStr}>`, '');
    }
    // handle the "of" part
    let ofTypes = ofStr !== '' ? [ofStr.toLowerCase()] : undefined;
    if (ofStr !== undefined && ofStr.includes('|')) {
        ofTypes = ofStr.split('|').map((t) => t.trim().toLowerCase());
    }
    return {
        type: typeStr,
        of: ofTypes
    };
}
const fn = function parseTypeString(typeString) {
    // typeString = 'Array<Path>|String|Array<Object|Map>|Youhou[]';
    typeString = typeString.toLowerCase().trim();
    typeString = typeString
        .split('|')
        .map((part) => {
        part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, 'array<$1>');
        return part;
    })
        .join('|');
    typeString = typeString
        .split('|')
        .map((part) => {
        part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, 'object<$1>');
        return part;
    })
        .join('|');
    let types = [], inGroup = false, currentStr = '';
    for (let i = 0; i < typeString.length; i++) {
        const char = typeString[i];
        if (char === '<') {
            inGroup = true;
            currentStr += char;
        }
        else if (char === '>') {
            inGroup = false;
            currentStr += char;
        }
        else if (char === '|') {
            if (inGroup === false) {
                types.push(currentStr);
                currentStr = '';
            }
            else {
                currentStr += char;
            }
        }
        else {
            currentStr += char;
        }
    }
    types.push(currentStr);
    const finalTypes = [];
    types.forEach((type) => {
        finalTypes.push(parseSingleTypeString(type));
    });
    const res = {
        raw: typeString,
        types: finalTypes
    };
    return res;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VUeXBlU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOztBQThDVixTQUFTLHFCQUFxQixDQUM1QixVQUFrQjtJQUVsQixJQUFJLEtBQUssR0FBVyxFQUFFLEVBQ3BCLE9BQU8sR0FBVyxVQUFVLENBQUM7SUFFL0IsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3pDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0M7SUFDRCx1QkFBdUI7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQy9ELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDL0Q7SUFFRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixFQUFFLEVBQUUsT0FBTztL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