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
        define(["require", "exports", "./parseRgba", "./parseHsv", "./hsv2rgba", "./parseHsl", "./hsl2rgba", "./hex2rgba", "./rgba2hsl", "./rgba2hsv"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parseRgba_1 = __importDefault(require("./parseRgba"));
    var parseHsv_1 = __importDefault(require("./parseHsv"));
    var hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
    var parseHsl_1 = __importDefault(require("./parseHsl"));
    var hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
    var hex2rgba_1 = __importDefault(require("./hex2rgba"));
    var rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
    var rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
    /**
     * @name            parse
     * @namespace           sugar.js.color
     * @type            Function
     * @private
     * @stable
     *
     * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
     *
     * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
     * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
     * @return      {Object}                  The rgba representation of the passed color
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import parse from '@coffeekraken/sugar/js/color/parse';
     * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parse(color, format) {
        if (format === void 0) { format = 'rgba'; }
        color = color.replace(/\s/g, '');
        if (color.indexOf('rgb') != -1) {
            color = parseRgba_1.default(color);
        }
        else if (color.indexOf('hsv') != -1) {
            color = parseHsv_1.default(color);
            color = hsv2rgba_1.default(color.h, color.s, color.v);
        }
        else if (color.indexOf('hsl') != -1) {
            color = parseHsl_1.default(color);
            color = hsl2rgba_1.default(color.h, color.s, color.l);
        }
        else if (color.substring(0, 1) == '#') {
            color = hex2rgba_1.default(color);
        }
        switch (format) {
            case 'hsl':
                return rgba2hsl_1.default(color);
                break;
            case 'hsv':
                return rgba2hsv_1.default(color);
                break;
            case 'rgba':
            default:
                return color;
                break;
        }
    }
    exports.default = parse;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMERBQXNDO0lBQ3RDLHdEQUFvQztJQUNwQyx3REFBb0M7SUFDcEMsd0RBQW9DO0lBQ3BDLHdEQUFvQztJQUNwQyx3REFBb0M7SUFDcEMsd0RBQW9DO0lBQ3BDLHdEQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBZTtRQUFmLHVCQUFBLEVBQUEsZUFBZTtRQUNuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzlCLEtBQUssR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckMsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQzthQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE9BQU8sa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsTUFBTTtZQUNSLEtBQUssTUFBTSxDQUFDO1lBQ1o7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7Z0JBQ2IsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUNELGtCQUFlLEtBQUssQ0FBQyJ9