// @ts-nocheck
import __deepMerge from '../object/deepMerge.js';
/**
 * @name          simply
 * @namespace            shared.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take a string with accents, etc and convert it to a more simply
 * version like "éàddö" to "eaddo"
 *
 * @param       {String}        string        The string to simplyfy
 * @param       {Object}        [settings={}]       An object of settings to simplify your string as you want:
 * - specialChars (true) {Boolean}: Specify if you want to get rid of the special chars like é, è, etc...
 * - lowerCase (true) {Boolean}: Specify if you want your returned string to be lowercased
 * - dashSpace (true) {Boolean}: Specify if you want to replace the "_|-" by a space
 * - trim (true} {Boolean}: Specify if you want your string to be trimed or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __simplify($1)
 *
 * @example       js
 * import { __simplify } from '@coffeekraken/sugar/string';
 * __simplify('éàddö'); // => eaddo
 *
 * @since     2.0.0
 * @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>
 */
export default function __simplify(string, settings = {}) {
    settings = __deepMerge({
        specialChars: true,
        lowerCase: true,
        dashSpace: true,
        trim: true,
    }, settings);
    if (string == null)
        return '';
    const map = {
        A: 'À|Á|Ã|Â|Ä',
        a: 'á|à|ã|â|ä',
        E: 'É|È|Ê|Ë',
        e: 'é|è|ê|ë',
        I: 'Í|Ì|Î|Ï',
        i: 'í|ì|î|ï',
        O: 'Ó|Ò|Ô|Õ|Ö',
        o: 'ó|ò|ô|õ|ö',
        U: 'Ú|Ù|Û|Ü|Ü',
        u: 'ú|ù|û|ü|ü',
        C: 'Ç',
        c: 'ç',
        N: 'Ñ',
        n: 'ñ',
    };
    if (settings.dashSpace) {
        map[' '] = '_|-';
    }
    if (settings.lowerCase) {
        string = string.toLowerCase();
    }
    if (settings.specialChars) {
        for (const pattern in map) {
            string = string.replace(new RegExp(map[pattern], 'g'), pattern);
        }
    }
    if (settings.trim)
        string = string.trim();
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3BELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksWUFBWSxFQUFFLElBQUk7UUFDbEIsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsSUFBSTtRQUNmLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksTUFBTSxJQUFJLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM5QixNQUFNLEdBQUcsR0FBRztRQUNSLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsU0FBUztRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osQ0FBQyxFQUFFLFNBQVM7UUFDWixDQUFDLEVBQUUsU0FBUztRQUNaLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7S0FDVCxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDcEI7SUFFRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDcEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNqQztJQUVELElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtRQUN2QixLQUFLLE1BQU0sT0FBTyxJQUFJLEdBQUcsRUFBRTtZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkU7S0FDSjtJQUVELElBQUksUUFBUSxDQUFDLElBQUk7UUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFDLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==