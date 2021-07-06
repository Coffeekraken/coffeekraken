import __theme from './theme';
import __minifyVar from './minifyVar';
/**
 * @name        themeVar
 * @namespace   node.utils
 * @type        Function
 *
 * This function take a simple theme dot path and returns the proper
 * variable string with the value fallback.
 *
 * @param       {String}        dotPath         The dot path theme variable you want
 * @return      {String}                        The proper css variable string that represent this value with his fallback just in case
 *
 * @example         js
 * import { themeVar } from '@coffeekraken/s-postcss-sugar-plugin';
 * themeVar('ui.button.padding'); // => var(--s-theme-ui-button-padding, 1em 1.2em)
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function themeVar(dotPath, fallback = true) {
    let fb = __theme().config(dotPath);
    if (!fallback || typeof fb === 'string' && fb.includes(','))
        fb = 0;
    const v = `var(${__minifyVar(`--s-theme-${dotPath
        .replace(/\./gm, '-')
        .replace(/:/gm, '-')
        .replace(/\?/gm, '')
        .replace(/--/gm, '-')}`)}, ${fb})`;
    return v;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVWYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVZhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUFDLE9BQWUsRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUMvRCxJQUFJLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLGFBQWEsT0FBTztTQUM5QyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUNyQyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMifQ==