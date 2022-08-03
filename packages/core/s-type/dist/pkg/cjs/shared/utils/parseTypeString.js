"use strict";
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
        of: ofTypes,
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
        types: finalTypes,
    };
    return res;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNkNBLFNBQVMscUJBQXFCLENBQzFCLFVBQWtCO0lBRWxCLElBQUksS0FBSyxHQUFHLEVBQUUsRUFDVixPQUFPLEdBQVcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN2QyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUNELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUNkLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDL0M7SUFDRCx1QkFBdUI7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQy9ELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDakU7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLE9BQU87UUFDYixFQUFFLEVBQUUsT0FBTztLQUNkLENBQUM7QUFDTixDQUFDO0FBQ0QsTUFBTSxFQUFFLEdBQXFCLFNBQVMsZUFBZSxDQUNqRCxVQUFrQjtJQUVsQixnRUFBZ0U7SUFFaEUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUU3QyxVQUFVLEdBQUcsVUFBVTtTQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixVQUFVLEdBQUcsVUFBVTtTQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLEtBQUssR0FBYSxFQUFFLEVBQ3BCLE9BQU8sR0FBRyxLQUFLLEVBQ2YsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLFVBQVUsSUFBSSxJQUFJLENBQUM7U0FDdEI7YUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDckIsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixVQUFVLElBQUksSUFBSSxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkIsVUFBVSxHQUFHLEVBQUUsQ0FBQzthQUNuQjtpQkFBTTtnQkFDSCxVQUFVLElBQUksSUFBSSxDQUFDO2FBQ3RCO1NBQ0o7YUFBTTtZQUNILFVBQVUsSUFBSSxJQUFJLENBQUM7U0FDdEI7S0FDSjtJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkIsTUFBTSxVQUFVLEdBQXNDLEVBQUUsQ0FBQztJQUN6RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkIsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQThCO1FBQ25DLEdBQUcsRUFBRSxVQUFVO1FBQ2YsS0FBSyxFQUFFLFVBQVU7S0FDcEIsQ0FBQztJQUNGLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=