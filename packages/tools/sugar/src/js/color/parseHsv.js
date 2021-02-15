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
     * @name                parseHsv
     * @namespace           sugar.js.color
     * @type                Function
     * @stable
     *
     * Parse HSV
     *
     * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
     * @return        	{object}					                        		The hsv object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import parseHsv from '@coffeekraken/sugar/js/color/parseHsv';
     * parseHsv('hsv(10,10,10)');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseHsv(hsvString) {
        hsvString = hsvString.toLowerCase();
        var string = hsvString
            .replace('hsv(', '')
            .replace(')', '')
            .replace(/\s/g, '');
        var array = string.split(',');
        return {
            h: parseFloat(array[0]),
            s: parseFloat(array[1]),
            v: parseFloat(array[2])
        };
    }
    exports.default = parseHsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUhzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsUUFBUSxDQUFDLFNBQVM7UUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFNLE1BQU0sR0FBRyxTQUFTO2FBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2FBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==