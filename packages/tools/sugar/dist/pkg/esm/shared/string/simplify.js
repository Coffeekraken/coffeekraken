// @ts-nocheck
import __deepMerge from '../object/deepMerge';
/**
 * @name          simply
 * @namespace            js.string
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
 * @example       js
 * import simplify from '@coffeekraken/sugar/js/string/simplify';
 * simplify('éàddö'); // => eaddo
 *
 * @since     2.0.0
 * @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>
 */
function simplify(string, settings = {}) {
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
export default simplify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNuQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLElBQUk7UUFDZixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLE1BQU0sSUFBSSxJQUFJO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDOUIsTUFBTSxHQUFHLEdBQUc7UUFDUixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFNBQVM7UUFDWixDQUFDLEVBQUUsU0FBUztRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osQ0FBQyxFQUFFLFNBQVM7UUFDWixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO0tBQ1QsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3BCO0lBRUQsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDakM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDdkIsS0FBSyxNQUFNLE9BQU8sSUFBSSxHQUFHLEVBQUU7WUFDdkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO0tBQ0o7SUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJO1FBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUxQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==