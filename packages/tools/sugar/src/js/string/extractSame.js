// @ts-nocheck
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
    /**
     * @name              extractSame
     * @namespace           sugar.js.string
     * @type              Function
     * @stable
     *
     * This function return you what has been find the same in the two passed string.
     * It will return you either an array of same string parts or a simple string
     * representing the first same part found.
     *
     * @param         {String}            string1         The string 1 to compare
     * @param         {String}            string2         The string 2 to compare
     * @param         {Boolean}           [multiple=false]      Specify if you want to get back multiple same string if exists as an array
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import extractSame from '@coffeekraken/sugar/js/string/extractSame';
     * extractSame('Hello world', 'Hello plop'); // => 'Hello '
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function extractSame(string1, string2, multiple) {
        if (multiple === void 0) { multiple = false; }
        // compare letter by letter
        var extractedArray = [''];
        var chars = string1.split('');
        var chars2 = string2.split('');
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            var char2 = chars2[i];
            if (i > chars2.length - 1)
                break;
            if (char === char2) {
                extractedArray[extractedArray.length - 1] += char;
            }
            else if (multiple) {
                if (extractedArray[extractedArray.length - 1] !== '')
                    extractedArray.push('');
            }
            else {
                break;
            }
        }
        return multiple ? extractedArray : extractedArray[0];
    }
    exports.default = extractSame;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFNhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0U2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDckQsMkJBQTJCO1FBQzNCLElBQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE1BQU07WUFDakMsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUNsQixjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDbkQ7aUJBQU0sSUFBSSxRQUFRLEVBQUU7Z0JBQ25CLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDbEQsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxNQUFNO2FBQ1A7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=