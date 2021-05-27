import __theme from './theme';
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
export default function themeVar(dotPath) {
    const v = `var(--s-theme-${dotPath
        .replace(/\./gm, '-')
        .replace(/:/gm, '-')
        .replace(/\?/gm, '')
        .replace(/--/gm, '-')}, ${__theme().config(dotPath)})`;
    return v;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVWYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVZhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsT0FBZTtJQUM5QyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsT0FBTztTQUMvQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3pELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyJ9