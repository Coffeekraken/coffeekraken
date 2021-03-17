// @shared
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
        var ofStr = '', typeStr = typeString;
        var ofPartsString = typeString.match(/<(.+)>$/gm);
        if (ofPartsString && ofPartsString.length) {
            ofStr = ofPartsString[0].replace('<', '').replace('>', '');
        }
        if (ofStr !== '') {
            typeStr = typeStr.replace("<" + ofStr + ">", '');
        }
        // handle the "of" part
        var ofTypes = ofStr !== '' ? [ofStr.toLowerCase()] : undefined;
        if (ofStr !== undefined && ofStr.includes('|')) {
            ofTypes = ofStr.split('|').map(function (t) { return t.trim().toLowerCase(); });
        }
        return {
            type: typeStr,
            of: ofTypes
        };
    }
    var fn = function parseTypeString(typeString) {
        // typeString = 'Array<Path>|String|Array<Object|Map>|Youhou[]';
        typeString = typeString.toLowerCase().trim();
        typeString = typeString
            .split('|')
            .map(function (part) {
            part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, 'array<$1>');
            return part;
        })
            .join('|');
        typeString = typeString
            .split('|')
            .map(function (part) {
            part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, 'object<$1>');
            return part;
        })
            .join('|');
        var types = [], inGroup = false, currentStr = '';
        for (var i = 0; i < typeString.length; i++) {
            var char = typeString[i];
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
        var finalTypes = [];
        types.forEach(function (type) {
            finalTypes.push(parseSingleTypeString(type));
        });
        var res = {
            raw: typeString,
            types: finalTypes
        };
        return res;
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC90eXBlL3BhcnNlVHlwZVN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7SUE4Q1YsU0FBUyxxQkFBcUIsQ0FDNUIsVUFBa0I7UUFFbEIsSUFBSSxLQUFLLEdBQVcsRUFBRSxFQUNwQixPQUFPLEdBQVcsVUFBVSxDQUFDO1FBRS9CLElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFJLEtBQUssTUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsdUJBQXVCO1FBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQXRCLENBQXNCLENBQUMsQ0FBQztTQUMvRDtRQUVELE9BQU87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