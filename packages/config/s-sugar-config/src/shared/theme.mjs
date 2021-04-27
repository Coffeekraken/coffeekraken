import __sugarConfig from './sugar';
import __get from '@coffeekraken/sugar/shared/object/get';
/**
 * @name            themeConfig
 * @namespace       shared
 * @type            Function
 *
 * This function simply get a theme value depending on the dot path passed and the
 * theme wanted.
 * If the wanted theme is not ```default```, it will try to get the value from
 * this passed theme and fallback to the default theme value if not exists.
 *
 * @param       {String}        dotPath         The dot path to the value wanted
 * @param       {String}        [theme='default']       The theme from which to get the value
 * @return      {Any}                           The value getted from the theme
 *
 * @example         js
 * import { themeConfig } from '@coffeekraken/s-sugar-config';
 * themeConfig('paddings.100'); // => 1rem
 * themeConfig('dark:paddings.100'); // => 1.5rem
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function themeConfig(dotPath) {
    // get theme
    const themeObj = __sugarConfig('theme');
    let theme = dotPath.includes(':')
        ? dotPath.split(':')[0]
        : themeObj.baseTheme;
    if (!themeObj.themes[theme])
        theme = 'default';
    const res = __get(themeObj.themes[theme], dotPath);
    if (res !== undefined)
        return res;
    if (theme !== 'default')
        return themeConfig('default:' + dotPath);
    throw new Error(`<red>[themeConfig]</red> Sorry but the requested value "<yellow>${dotPath}</yellow>" for the theme "<cyan>${theme}</cyan>" does not exists...`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb25maWcvcy1zdWdhci1jb25maWcvc3JjL3NoYXJlZC90aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLE9BQWU7SUFDakQsWUFBWTtJQUNaLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMvQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMvQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxJQUFJLEdBQUcsS0FBSyxTQUFTO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDbEMsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLE9BQU8sV0FBVyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNsRSxNQUFNLElBQUksS0FBSyxDQUNiLG1FQUFtRSxPQUFPLG1DQUFtQyxLQUFLLDZCQUE2QixDQUNoSixDQUFDO0FBQ0osQ0FBQyJ9