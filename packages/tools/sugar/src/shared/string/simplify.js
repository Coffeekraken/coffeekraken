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
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name          simply
     * @namespace     sugar.js.string
     * @type          Function
     * @stable
     *
     * This function take a string with accents, etc and convert it to a more simply
     * version like "éàddö" to "eaddo"
     *
     * @param       {String}        string        The string to simplyfy
     * @param       {Object}        [settings={}]       An object of settings to simplify your string as you want:
     * - specialChars (true) {Boolean}: Specify if you want to get rid of the special chars like é, è, etc...
     * - lowerCase (true) {Boolean}: Specify if you want your returned string to be lowercased
     * - dashSpace (true) {Boolean}: Specify if you want to replace the "_|-" by a space
     * - trim (true} {Boolean}: Specify if you want your string to be trimed or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import simplify from '@coffeekraken/sugar/js/string/simplify';
     * simplify('éàddö'); // => eaddo
     *
     * @since     2.0.0
     * @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>
     */
    function simplify(string, settings = {}) {
        settings = deepMerge_1.default({
            specialChars: true,
            lowerCase: true,
            dashSpace: true,
            trim: true
        }, settings);
        if (string == null)
            return '';
        const map = {
            A: 'À|Á|Ã|Â|Ä',
            a: 'á|à|ã|â|ä',
            E: 'É|È|Ê|Ë',
            e: 'é|è|ê|ë',
            I: 'Í|Ì|Î|Ï',
            i: 'í|ì|î|ï',
            O: 'Ó|Ò|Ô|Õ|Ö',
            o: 'ó|ò|ô|õ|ö',
            U: 'Ú|Ù|Û|Ü|Ü',
            u: 'ú|ù|û|ü|ü',
            C: 'Ç',
            c: 'ç',
            N: 'Ñ',
            n: 'ñ'
        };
        if (settings.dashSpace) {
            map[' '] = '_|-';
        }
        if (settings.lowerCase) {
            string = string.toLowerCase();
        }
        if (settings.specialChars) {
            for (const pattern in map) {
                string = string.replace(new RegExp(map[pattern], 'g'), pattern);
            }
        }
        if (settings.trim)
            string = string.trim();
        return string;
    }
    exports.default = simplify;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxpZnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsb0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxZQUFZLEVBQUUsSUFBSTtZQUNsQixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxNQUFNLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxHQUFHO1lBQ1YsQ0FBQyxFQUFFLFdBQVc7WUFDZCxDQUFDLEVBQUUsV0FBVztZQUNkLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLFNBQVM7WUFDWixDQUFDLEVBQUUsU0FBUztZQUNaLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLFdBQVc7WUFDZCxDQUFDLEVBQUUsV0FBVztZQUNkLENBQUMsRUFBRSxXQUFXO1lBQ2QsQ0FBQyxFQUFFLFdBQVc7WUFDZCxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztTQUNQLENBQUM7UUFFRixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNsQjtRQUVELElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3pCLEtBQUssTUFBTSxPQUFPLElBQUksR0FBRyxFQUFFO2dCQUN6QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDakU7U0FDRjtRQUVELElBQUksUUFBUSxDQUFDLElBQUk7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==