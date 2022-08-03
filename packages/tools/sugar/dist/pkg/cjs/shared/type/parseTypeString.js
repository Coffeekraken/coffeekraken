"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoCast_1 = __importDefault(require("../string/autoCast"));
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
    const autoCastedValue = (0, autoCast_1.default)(typeStr);
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
function parseTypeString(typeString) {
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
            finalTypes = [...finalTypes, ...parseTypeString(type.type)];
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
    // @ts-ignore
    Object.defineProperty(finalTypes, 'toString', {
        get() {
            return () => originalTypeString;
        },
    });
    // @ts-ignore
    return finalTypes;
}
exports.default = parseTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTRDO0FBdUM1QyxTQUFTLHFCQUFxQixDQUFDLFVBQWtCO0lBQzdDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFDVixPQUFPLEdBQVcsVUFBVSxFQUM1QixPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTNCLGVBQWU7SUFDZixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekIsT0FBTztZQUNILElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLFNBQVM7WUFDYixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7U0FDN0QsQ0FBQztLQUNMO0lBQ0QsZUFBZTtJQUNmLE1BQU0sZUFBZSxHQUFHLElBQUEsa0JBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxPQUFPO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLEtBQUssRUFBRSxlQUFlO1NBQ3pCLENBQUM7S0FDTDtJQUVELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV4RSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdkMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDOUQ7SUFDRCxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDZCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbkQ7SUFFRCxpQkFBaUI7SUFDakIscUNBQXFDO0lBQ3JDLGdEQUFnRDtJQUNoRCx3Q0FBd0M7SUFDeEMsUUFBUTtJQUNSLE1BQU07SUFDTiw2REFBNkQ7SUFFN0QsTUFBTSxNQUFNLEdBQUc7UUFDWCxJQUFJLEVBQUUsT0FBTztRQUNiLEVBQUUsRUFBRSxPQUFPO0tBQ2QsQ0FBQztJQUNGLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUU7UUFDdEMsR0FBRztZQUNDLE9BQU8sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQzVCLENBQUM7S0FDSixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsU0FBd0IsZUFBZSxDQUNuQyxVQUFrQjtJQUVsQixNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQztJQUV0QyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRS9CLGlDQUFpQztJQUNqQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU5RCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDZixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNyRTtJQUVELE1BQU0sVUFBVSxHQUFVLEVBQUUsQ0FBQztJQUM3QixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQ2QsT0FBTyxHQUFHLEVBQUUsRUFDWixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLGNBQWM7SUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsVUFBVSxFQUFFLENBQUM7WUFDYixZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxHQUFHLENBQUM7U0FDbEI7YUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxVQUFVLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxHQUFHLENBQUM7WUFDZixtQkFBbUI7U0FDdEI7YUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUN6QyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNaLFlBQVk7Z0JBQ1osSUFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNoQjthQUFNO1lBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQztTQUNuQjtRQUNELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNYLG1DQUFtQyxVQUFVLG1CQUFtQixDQUNuRSxDQUFDO1NBQ0w7S0FDSjtJQUNELFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDWixZQUFZO1FBQ1osSUFBSSxFQUFFLE9BQU87S0FDaEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxVQUFVLEdBQXNDLEVBQUUsQ0FBQztJQUN2RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDSCxVQUFVLENBQUMsSUFBSSxDQUNYLHFCQUFxQixDQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDaEQsQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTyxFQUFFO1FBQ1QsTUFBTSxNQUFNLEdBQUc7WUFDWDtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsVUFBVTthQUNqQjtTQUNKLENBQUM7UUFDRixhQUFhO1FBQ2IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFDckQsYUFBYTtRQUNiLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBQ0QsYUFBYTtJQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRTtRQUMxQyxHQUFHO1lBQ0MsT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztRQUNwQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsYUFBYTtJQUNiLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFwRkQsa0NBb0ZDIn0=