// @ts-nocheck
import __hsla2rgba from './hsla2rgba';
import __parse from './parse';
import __rgba2hex from './rgba2hex';
import __rgba2hsla from './rgba2hsla';
/**
 * @name                  convert
 * @namespace            js.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status            beta
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            rgbaObj = __hsla2rgba(input);
        }
    }
    switch (format) {
        case 'rgba':
            return rgbaObj;
        case 'hsl':
        case 'hsla':
            return __rgba2hsla(rgbaObj);
        case 'hex':
        case 'hexString':
            return __rgba2hex(rgbaObj);
        case 'rgbString':
            return `rgb(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b})`;
        case 'rgbaString':
            return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
        case 'hslString':
            const hslObj = convert(rgbaObj, 'hsl');
            return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
        case 'hslaString':
            const hslaObj = convert(rgbaObj, 'hsla');
            return `hsla(${hslaObj.h},${hslaObj.s},${hslaObj.l},${hslaObj.a})`;
    }
    // if nothing supported
    return undefined;
}
export default convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU07SUFDbkMsMENBQTBDO0lBQzFDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2xDLElBQ0ksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDdkI7WUFDRSxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25CO2FBQU0sSUFDSCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUN2QjtZQUNFLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7S0FDSjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsT0FBTyxPQUFPLENBQUM7UUFDbkIsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLE1BQU07WUFDUCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssV0FBVztZQUNaLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLEtBQUssV0FBVztZQUNaLE9BQU8sT0FBTyxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pELEtBQUssWUFBWTtZQUNiLE9BQU8sUUFBUSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdkUsS0FBSyxXQUFXO1lBQ1osTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxLQUFLLFlBQVk7WUFDYixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sUUFBUSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDMUU7SUFFRCx1QkFBdUI7SUFDdkIsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=