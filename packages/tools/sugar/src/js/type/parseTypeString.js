// @shared
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
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VUeXBlU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUE4Q1YsU0FBUyxxQkFBcUIsQ0FDNUIsVUFBa0I7SUFFbEIsSUFBSSxLQUFLLEdBQVcsRUFBRSxFQUNwQixPQUFPLEdBQVcsVUFBVSxDQUFDO0lBRS9CLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN6QyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1RDtJQUNELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsdUJBQXVCO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMvRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsT0FBTztRQUNMLElBQUksRUFBRSxPQUFPO1FBQ2IsRUFBRSxFQUFFLE9BQU87S0FD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