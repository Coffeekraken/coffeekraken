// @ts-nocheck
import __parse from './parse';
import __hsl2rgba from './hsl2rgba';
import __hsv2rgba from './hsv2rgba';
import __rgba2hsl from './rgba2hsl';
import __rgba2hsv from './rgba2hsv';
import __rgba2hex from './rgba2hex';
/**
 * @name                  convert
 * @namespace            js.color
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvY29sb3IvY29udmVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNO0lBQ3JDLDBDQUEwQztJQUMxQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxJQUNFLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3JCO1lBQ0EsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNqQjthQUFNLElBQ0wsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7WUFDQSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFDTCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtZQUNBLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7S0FDRjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxNQUFNO1lBQ1QsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFdBQVc7WUFDZCxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLFlBQVk7WUFDZixPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JFLEtBQUssV0FBVztZQUNkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEQsS0FBSyxXQUFXO1lBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUNyRDtJQUVELHVCQUF1QjtJQUN2QixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==