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
        define(["require", "exports", "./parse", "./hsl2rgba", "./hsv2rgba", "./rgba2hsl", "./rgba2hsv", "./rgba2hex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parse_1 = __importDefault(require("./parse"));
    const hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
    const hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
    const rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
    const rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
    const rgba2hex_1 = __importDefault(require("./rgba2hex"));
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
     * @return          {Mixed}                               The converted color
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
    function convert(input, format = 'rgba') {
        // transforming the input into rgba object
        let rgbaObj = {};
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
                return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
            case 'hslString':
                const hslObj = convert(rgbaObj, 'hsl');
                return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
            case 'hsvString':
                const hsvObj = convert(rgbaObj, 'hsv');
                return `hsv(${hsvObj.h},${hsvObj.s},${hsvObj.v})`;
        }
        // if nothing supported
        return undefined;
    }
    exports.default = convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0RBQThCO0lBQzlCLDBEQUFvQztJQUNwQywwREFBb0M7SUFDcEMsMERBQW9DO0lBQ3BDLDBEQUFvQztJQUNwQywwREFBb0M7SUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNO1FBQ3JDLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxHQUFHLGVBQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbEM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxJQUNFLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztnQkFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7Z0JBQ0EsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNqQjtpQkFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztnQkFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7Z0JBQ0EsT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU0sSUFDTCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztnQkFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3JCO2dCQUNBLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7UUFFRCxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssTUFBTTtnQkFDVCxPQUFPLE9BQU8sQ0FBQztZQUNqQixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLEtBQUssS0FBSztnQkFDUixPQUFPLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLEtBQUssWUFBWTtnQkFDZixPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3JFLEtBQUssV0FBVztnQkFDZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNwRCxLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDckQ7UUFFRCx1QkFBdUI7UUFDdkIsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9