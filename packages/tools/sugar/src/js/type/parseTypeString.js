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
    /**
     * @name            parseTypeString
     * @namespace       sugar.js.type
     * @type            Function
     *
     * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
     * an object defining this type string
     *
     * @param     {String}        typeString      The type string to parse
     * @return    {ITypeStringObject}             An object describing the type string passed
     *
     * @example       js
     * import parseTypeString from '@coffeekraken/sugar/js/type/parseTypeString';
     * parseTypeString('string | path');
     * // {
     * //   raw: 'string | path',
     * //   types: [SType('string'), SType('path')],
     * // }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
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
    return fn;
});
