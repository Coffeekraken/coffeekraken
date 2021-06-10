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
export default function themeVar(dotPath, fallback = true) {
    let fb = __theme().config(dotPath);
    if (!fallback || typeof fb === 'string' && fb.includes(','))
        fb = 0;
    const v = `var(--s-theme-${dotPath
        .replace(/\./gm, '-')
        .replace(/:/gm, '-')
        .replace(/\?/gm, '')
        .replace(/--/gm, '-')}, ${fb})`;
    return v;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVWYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVZhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsT0FBZSxFQUFFLFFBQVEsR0FBRyxJQUFJO0lBQy9ELElBQUksRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFcEUsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLE9BQU87U0FDL0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7U0FDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7U0FDbkIsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDbkIsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUNsQyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMifQ==