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
        define(["require", "exports", "./em2px", "./em2px", "./px2em", "./px2rem"], factory);
    }
})(function (require, exports) {
    "use strict";
    var em2px_1 = __importDefault(require("./em2px"));
    var em2px_2 = __importDefault(require("./em2px"));
    var px2em_1 = __importDefault(require("./px2em"));
    var px2rem_1 = __importDefault(require("./px2rem"));
    /**
     * @name                  convert
     * @namespace           sugar.js.unit
     * @type                  Function
     * @stable
     *
     * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
     *
     * @param         {String|Number}           from            The base value to convert
     * @param         {String}                  [to='px']       The value unit you want back
     * @return        {Number}                                  The converted value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import convert from '@coffeekraken/sugar/js/unit/convert';
     * convert('2rem', 'px');
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function convert(from, to, $elm) {
        if (to === void 0) { to = 'px'; }
        var fromUnit = 'px';
        if (typeof from === 'string' && parseFloat(from).toString() !== from) {
            fromUnit = from.replace(/[0-9.,]+/g, '');
        }
        var fromNumber = parseFloat(from);
        var pxValue;
        switch (fromUnit) {
            case 'px':
                pxValue = fromNumber;
                break;
            case 'rem':
                pxValue = em2px_2.default(fromNumber);
                break;
            case 'em':
                pxValue = em2px_1.default(fromNumber, $elm);
                break;
            default:
                return from;
                break;
        }
        switch (to) {
            case 'px':
                return pxValue;
                break;
            case 'rem':
                return px2rem_1.default(pxValue);
                break;
            case 'em':
                return px2em_1.default(pxValue, $elm);
                break;
            default:
                return from;
                break;
        }
    }
    return convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0RBQThCO0lBQzlCLGtEQUErQjtJQUMvQixrREFBOEI7SUFDOUIsb0RBQWdDO0lBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQVMsRUFBRSxJQUFJO1FBQWYsbUJBQUEsRUFBQSxTQUFTO1FBQzlCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3BFLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxQztRQUNELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLE9BQU8sQ0FBQztRQUNaLFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssSUFBSTtnQkFDUCxPQUFPLEdBQUcsVUFBVSxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE9BQU8sR0FBRyxlQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxHQUFHLGVBQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDUjtnQkFDRSxPQUFPLElBQUksQ0FBQztnQkFDWixNQUFNO1NBQ1Q7UUFDRCxRQUFRLEVBQUUsRUFBRTtZQUNWLEtBQUssSUFBSTtnQkFDUCxPQUFPLE9BQU8sQ0FBQztnQkFDZixNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE9BQU8sZ0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxPQUFPLGVBQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUjtnQkFDRSxPQUFPLElBQUksQ0FBQztnQkFDWixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBQ0QsT0FBUyxPQUFPLENBQUMifQ==