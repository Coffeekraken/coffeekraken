(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC91dGlscy9wYXJzZVR5cGVTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUE0Q0EsU0FBUyxxQkFBcUIsQ0FDNUIsVUFBa0I7UUFFbEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUNaLE9BQU8sR0FBVyxVQUFVLENBQUM7UUFFL0IsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3pDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0M7UUFDRCx1QkFBdUI7UUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQy9ELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxD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