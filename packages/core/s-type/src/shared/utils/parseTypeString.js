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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VUeXBlU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBNENBLFNBQVMscUJBQXFCLENBQzVCLFVBQWtCO1FBRWxCLElBQUksS0FBSyxHQUFHLEVBQUUsRUFDWixPQUFPLEdBQVcsVUFBVSxDQUFDO1FBRS9CLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsdUJBQXVCO1FBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLE9BQU87U0FD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