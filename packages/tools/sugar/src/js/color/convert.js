// @ts-nocheck
// @shared
import __parse from './parse';
import __hsl2rgba from './hsl2rgba';
import __hsv2rgba from './hsv2rgba';
import __rgba2hsl from './rgba2hsl';
import __rgba2hsv from './rgba2hsv';
import __rgba2hex from './rgba2hex';
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
function convert(input, format = 'rgba') {
    // transforming the input into rgba object
    let rgbaObj = {};
    if (typeof input === 'string') {
        rgbaObj = __parse(input, 'rgba');
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
            rgbaObj = __hsl2rgba(input);
        }
        else if (input.h !== undefined &&
            input.s !== undefined &&
            input.v !== undefined) {
            rgbaObj = __hsv2rgba(input);
        }
    }
    switch (format) {
        case 'rgba':
            return rgbaObj;
        case 'hsl':
            return __rgba2hsl(rgbaObj);
        case 'hsv':
            return __rgba2hsv(rgbaObj);
        case 'hex':
        case 'hexString':
            return __rgba2hex(rgbaObj);
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
export default convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU07SUFDckMsMENBQTBDO0lBQzFDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLElBQ0UsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7WUFDQSxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ2pCO2FBQU0sSUFDTCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtZQUNBLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3JCO1lBQ0EsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtLQUNGO0lBRUQsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLE1BQU07WUFDVCxPQUFPLE9BQU8sQ0FBQztRQUNqQixLQUFLLEtBQUs7WUFDUixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLEtBQUs7WUFDUixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssV0FBVztZQUNkLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLEtBQUssWUFBWTtZQUNmLE9BQU8sUUFBUSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckUsS0FBSyxXQUFXO1lBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwRCxLQUFLLFdBQVc7WUFDZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sT0FBTyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQ3JEO0lBRUQsdUJBQXVCO0lBQ3ZCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9