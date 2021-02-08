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
        define(["require", "exports", "./parse", "./hsl2rgba", "./hsv2rgba", "./rgba2hsl", "./rgba2hsv", "./rgba2hex"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parse_1 = __importDefault(require("./parse"));
    var hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
    var hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
    var rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
    var rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
    var rgba2hex_1 = __importDefault(require("./rgba2hex"));
    /**
     * @name                  convert
     * @namespace           sugar.js.color
     * @type                  Function
     * @stable
     *
     * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
     * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
     *
     * @param           {Mixed}               input           The input color to convert
     * @param           {String}              [format="rgba"]     The format wanted
     * @return          {Mixed}                               The converted color
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import convert from '@coffeekraken/sugar/js/color/convert';
     * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function convert(input, format) {
        if (format === void 0) { format = 'rgba'; }
        // transforming the input into rgba object
        var rgbaObj = {};
        if (typeof input === 'string') {
            rgbaObj = parse_1.default(input, 'rgba');
        }
        else if (typeof input === 'object') {
            if (input.r !== undefined &&
                input.g !== undefined &&
                input.b !== undefined) {
                rgbaObj = input;
            }
            else if (input.h !== undefined &&
                input.s !== undefined &&
                input.l !== undefined) {
                rgbaObj = hsl2rgba_1.default(input);
            }
            else if (input.h !== undefined &&
                input.s !== undefined &&
                input.v !== undefined) {
                rgbaObj = hsv2rgba_1.default(input);
            }
        }
        switch (format) {
            case 'rgba':
                return rgbaObj;
            case 'hsl':
                return rgba2hsl_1.default(rgbaObj);
            case 'hsv':
                return rgba2hsv_1.default(rgbaObj);
            case 'hex':
            case 'hexString':
                return rgba2hex_1.default(rgbaObj);
            case 'rgbaString':
                return "rgba(" + rgbaObj.r + "," + rgbaObj.g + "," + rgbaObj.b + "," + rgbaObj.a + ")";
            case 'hslString':
                var hslObj = convert(rgbaObj, 'hsl');
                return "hsl(" + hslObj.h + "," + hslObj.s + "," + hslObj.l + ")";
            case 'hsvString':
                var hsvObj = convert(rgbaObj, 'hsv');
                return "hsv(" + hsvObj.h + "," + hsvObj.s + "," + hsvObj.v + ")";
        }
        // if nothing supported
        return undefined;
    }
    return convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0RBQThCO0lBQzlCLHdEQUFvQztJQUNwQyx3REFBb0M7SUFDcEMsd0RBQW9DO0lBQ3BDLHdEQUFvQztJQUNwQyx3REFBb0M7SUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQWU7UUFBZix1QkFBQSxFQUFBLGVBQWU7UUFDckMsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLEdBQUcsZUFBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3BDLElBQ0UsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtnQkFDQSxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO2lCQUFNLElBQ0wsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtnQkFDQSxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtpQkFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztnQkFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7Z0JBQ0EsT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUVELFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxNQUFNO2dCQUNULE9BQU8sT0FBTyxDQUFDO1lBQ2pCLEtBQUssS0FBSztnQkFDUixPQUFPLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSyxLQUFLO2dCQUNSLE9BQU8sa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssV0FBVztnQkFDZCxPQUFPLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSyxZQUFZO2dCQUNmLE9BQU8sVUFBUSxPQUFPLENBQUMsQ0FBQyxTQUFJLE9BQU8sQ0FBQyxDQUFDLFNBQUksT0FBTyxDQUFDLENBQUMsU0FBSSxPQUFPLENBQUMsQ0FBQyxNQUFHLENBQUM7WUFDckUsS0FBSyxXQUFXO2dCQUNkLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sU0FBTyxNQUFNLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsTUFBRyxDQUFDO1lBQ3BELEtBQUssV0FBVztnQkFDZCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLFNBQU8sTUFBTSxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLE1BQUcsQ0FBQztTQUNyRDtRQUVELHVCQUF1QjtRQUN2QixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsT0FBUyxPQUFPLENBQUMifQ==