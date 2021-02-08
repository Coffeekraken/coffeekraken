// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    var upperFirst_1 = __importDefault(require("../../string/upperFirst"));
    /**
     * @name              parseTypeDefinitionString
     * @namespace           sugar.js.validation.utils
     * @type              Function
     * @status              wip
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlRGVmaW5pdGlvblN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlVHlwZURlZmluaXRpb25TdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx1RUFBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLHlCQUF5QixDQUFDLGFBQWE7UUFDOUMsd0JBQXdCO1FBQ3hCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDbEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQ3hDLElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDckIsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO29CQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDBEQUF1RCxhQUFhLHFCQUFpQixDQUN0RixDQUFDO2lCQUNIO2dCQUNELE9BQU8sRUFBRSxDQUFDO2dCQUNWLFdBQVcsSUFBSSxTQUFTLENBQUM7Z0JBQ3pCLE9BQU87YUFDUjtZQUNELElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsV0FBVyxJQUFJLFNBQVMsQ0FBQztnQkFDekIsT0FBTzthQUNSO1lBQ0QsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO2dCQUNyQixJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7b0JBQ2YsV0FBVyxJQUFJLFNBQVMsQ0FBQztvQkFDekIsT0FBTztpQkFDUjtnQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM3QixXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxXQUFXLElBQUksU0FBUyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU3Qix3QkFBd0I7UUFDeEIsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLDJCQUEyQjtRQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsb0JBQW9CO1lBQ3RDLHdCQUF3QjtZQUN4QixJQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUMsaUJBQWlCO1lBQ2pCLElBQU0sSUFBSSxHQUFHLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEMsaUNBQWlDO1lBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDWixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0M7WUFFRCx1REFBdUQ7WUFDdkQsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDZixJQUFJLE1BQUE7Z0JBQ0osRUFBRSxFQUFFLE9BQU87YUFDWixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxPQUFTLHlCQUF5QixDQUFDIn0=