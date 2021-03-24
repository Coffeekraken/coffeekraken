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
        define(["require", "exports", "./em2px", "./em2px", "./px2em", "./px2rem"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const em2px_1 = __importDefault(require("./em2px"));
    const em2px_2 = __importDefault(require("./em2px"));
    const px2em_1 = __importDefault(require("./px2em"));
    const px2rem_1 = __importDefault(require("./px2rem"));
    /**
     * @name                  convert
     * @namespace           sugar.js.unit
     * @type                  Function
     * @stable
     *
     * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
     *
     * @param         {String|Number}           from            The base value to convert
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
    function convert(from, to = 'px', $elm) {
        let fromUnit = 'px';
        if (typeof from === 'string' && parseFloat(from).toString() !== from) {
            fromUnit = from.replace(/[0-9.,]+/g, '');
        }
        const fromNumber = parseFloat(from);
        let pxValue;
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
    exports.default = convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0RBQThCO0lBQzlCLG9EQUErQjtJQUMvQixvREFBOEI7SUFDOUIsc0RBQWdDO0lBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsSUFBSTtRQUNwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNwRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDMUM7UUFDRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxPQUFPLENBQUM7UUFDWixRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxHQUFHLFVBQVUsQ0FBQztnQkFDckIsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixPQUFPLEdBQUcsZUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLE9BQU8sR0FBRyxlQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7Z0JBQ1osTUFBTTtTQUNUO1FBQ0QsUUFBUSxFQUFFLEVBQUU7WUFDVixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxPQUFPLENBQUM7Z0JBQ2YsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixPQUFPLGdCQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxlQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7Z0JBQ1osTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9