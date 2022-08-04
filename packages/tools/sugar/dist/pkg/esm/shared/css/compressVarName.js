import __SEnv from '@coffeekraken/s-env';
import __md5 from '../crypt/md5';
/**
 * @name            compressVarName
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function allows you to compress a css variable name only when the environment is production
 *
 * @param       {String}         name       The name to compress
 * @return      {String}                The compressed variable name
 *
 * @example         js
 * import compressVarName from '@coffeekraken/sugar/shared/css/compressVarName';
 * compressVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function compressVarName(name) {
    if (!__SEnv.is('production')) {
        return name;
    }
    const md5 = __md5.encrypt(name);
    const dict = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const sum = md5.split('').reduce((a, b) => {
        return a + dict.indexOf(b);
    }, 0);
    const compressed = md5
        .split('')
        .filter((char, i) => !(i % 5))
        .join('');
    return `--s${sum}${compressed}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUFDLElBQUk7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsTUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7SUFDcEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTixNQUFNLFVBQVUsR0FBRyxHQUFHO1NBQ2pCLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDVCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLE9BQU8sTUFBTSxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUM7QUFDcEMsQ0FBQyJ9