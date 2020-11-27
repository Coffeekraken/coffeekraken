// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    var upperFirst_1 = __importDefault(require("../string/upperFirst"));
    /**
     * @name              parseTypeDefinitionString
     * @namespace           sugar.js.parse
     * @type              Function
     * @wip
     *
     * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
     *
     * @param       {String}        argTypeString         The argument type definition string
     * @return      {Object}                              The argument type definition string in object format
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import parseTypeDefinitionString from '@coffeekraken/sugar/js/parse/parseTypeDefinitionString';
     * parseTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
     * parseTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseTypeDefinitionString(argTypeString) {
        // split the string by |
        var inDepth = 0;
        var currentPart = '', typesArray = [];
        argTypeString.split('').forEach(function (character) {
            if (character === '>') {
                if (inDepth <= 0) {
                    throw new Error("It seems that your argument type definition string \"" + argTypeString + "\" is invalid...");
                }
                inDepth--;
                currentPart += character;
                return;
            }
            if (character === '<') {
                inDepth++;
                currentPart += character;
                return;
            }
            if (character === '|') {
                if (inDepth > 0) {
                    currentPart += character;
                    return;
                }
                typesArray.push(currentPart);
                currentPart = '';
                return;
            }
            currentPart += character;
        });
        typesArray.push(currentPart);
        // init the return array
        var returnArray = [];
        // loop on each types array
        typesArray.forEach(function (typeDefinitionString) {
            // split the string by <
            var parts = typeDefinitionString.split('<');
            // get the "type"
            var type = upperFirst_1.default(parts[0]);
            // process the "of" part if exist
            var ofArray = null;
            if (parts[1]) {
                var ofPart = parts[1].slice(0, -1);
                ofArray = parseTypeDefinitionString(ofPart);
            }
            // build the type object and add it the the returnArray
            returnArray.push({
                type: type,
                of: ofArray
            });
        });
        return returnArray;
    }
    return parseTypeDefinitionString;
});
