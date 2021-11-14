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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxpZnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxZQUFZLEVBQUUsSUFBSTtRQUNsQixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxNQUFNLElBQUksSUFBSTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzlCLE1BQU0sR0FBRyxHQUFHO1FBQ1IsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxTQUFTO1FBQ1osQ0FBQyxFQUFFLFNBQVM7UUFDWixDQUFDLEVBQUUsU0FBUztRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztLQUNULENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNwQjtJQUVELElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNwQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLEtBQUssTUFBTSxPQUFPLElBQUksR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRTtLQUNKO0lBRUQsSUFBSSxRQUFRLENBQUMsSUFBSTtRQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFMUMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=