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
     * @name                    parseHsl
     * @namespace           sugar.js.color
     * @type                    Function
     * @stable
     *
     * Parse HSL
     *
     * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
     * @return 	        {object} 					                  	The hsl object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import parseHsl from '@coffeekraken/sugar/color/parseHsl';
     * parseHsl('hsl(20,20,20)');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseHsl(hslString) {
        hslString = hslString.toLowerCase();
        var string = hslString
            .replace('hsl(', '')
            .replace(')', '')
            .replace(/\s/g, '');
        var array = string.split(',');
        return {
            h: parseFloat(array[0]),
            s: parseFloat(array[1]),
            l: parseFloat(array[2])
        };
    }
    exports.default = parseHsl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIc2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUhzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsUUFBUSxDQUFDLFNBQVM7UUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFNLE1BQU0sR0FBRyxTQUFTO2FBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2FBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==