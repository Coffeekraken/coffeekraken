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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VUeXBlU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7OztJQThDVixTQUFTLHFCQUFxQixDQUM1QixVQUFrQjtRQUVsQixJQUFJLEtBQUssR0FBVyxFQUFFLEVBQ3BCLE9BQU8sR0FBVyxVQUFVLENBQUM7UUFFL0IsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3pDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQUksS0FBSyxNQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0M7UUFDRCx1QkFBdUI7UUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQy9ELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2Is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