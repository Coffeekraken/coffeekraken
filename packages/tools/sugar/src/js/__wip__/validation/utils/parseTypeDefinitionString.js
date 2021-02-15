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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = parseTypeDefinitionString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlRGVmaW5pdGlvblN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlVHlwZURlZmluaXRpb25TdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsdUVBQW1EO0lBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxhQUFhO1FBQzlDLHdCQUF3QjtRQUN4QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUNsQixVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUztZQUN4QyxJQUFJLFNBQVMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtvQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwREFBdUQsYUFBYSxxQkFBaUIsQ0FDdEYsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDVixXQUFXLElBQUksU0FBUyxDQUFDO2dCQUN6QixPQUFPO2FBQ1I7WUFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFdBQVcsSUFBSSxTQUFTLENBQUM7Z0JBQ3pCLE9BQU87YUFDUjtZQUNELElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDckIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO29CQUNmLFdBQVcsSUFBSSxTQUFTLENBQUM7b0JBQ3pCLE9BQU87aUJBQ1I7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0IsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsT0FBTzthQUNSO1lBQ0QsV0FBVyxJQUFJLFNBQVMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0Isd0JBQXdCO1FBQ3hCLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV2QiwyQkFBMkI7UUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLG9CQUFvQjtZQUN0Qyx3QkFBd0I7WUFDeEIsSUFBTSxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLGlCQUFpQjtZQUNqQixJQUFNLElBQUksR0FBRyxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLGlDQUFpQztZQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxHQUFHLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1lBRUQsdURBQXVEO1lBQ3ZELFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxNQUFBO2dCQUNKLEVBQUUsRUFBRSxPQUFPO2FBQ1osQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0Qsa0JBQWUseUJBQXlCLENBQUMifQ==