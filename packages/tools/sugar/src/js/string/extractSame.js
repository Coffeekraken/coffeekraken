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
    return extractSame;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFNhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0U2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFnQjtRQUFoQix5QkFBQSxFQUFBLGdCQUFnQjtRQUNyRCwyQkFBMkI7UUFDM0IsSUFBTSxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQUUsTUFBTTtZQUNqQyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQ2xCLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQzthQUNuRDtpQkFBTSxJQUFJLFFBQVEsRUFBRTtnQkFDbkIsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNsRCxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxPQUFTLFdBQVcsQ0FBQyJ9