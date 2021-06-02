import __SInterface from '@coffeekraken/s-interface';
import { themeDefinition } from '../../utils/theme';
class postcssSugarPluginThemeScopeMixinInterface extends __SInterface {
}
postcssSugarPluginThemeScopeMixinInterface.definition = {
    theme: themeDefinition
};
export { postcssSugarPluginThemeScopeMixinInterface as interface };
/**
 * @name           scope
 * @namespace      mixins.theme
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to start a scope whithin which the passed theme will be used to generate
 * the different styles.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.theme.scope(dark) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // @ts-ignore
    if (!global._postcssSugarPluginThemeScopeMixinTheme) {
        // @ts-ignore
        global._postcssSugarPluginThemeScopeMixinTheme = [];
    }
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme.push(finalParams.theme);
    replaceWith(atRule.nodes.map((node) => node.toString()).join('\n'));
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme =
        // @ts-ignore
        global._postcssSugarPluginThemeScopeMixinTheme.slice(0, -1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdELE1BQU0sMENBQTJDLFNBQVEsWUFBWTs7QUFDNUQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUUsZUFBZTtDQUN2QixDQUFDO0FBRUosT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLGFBQWE7SUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLHVDQUF1QyxFQUFFO1FBQ25ELGFBQWE7UUFDYixNQUFNLENBQUMsdUNBQXVDLEdBQUcsRUFBRSxDQUFDO0tBQ3JEO0lBRUQsYUFBYTtJQUNiLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZFLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFcEUsYUFBYTtJQUNiLE1BQU0sQ0FBQyx1Q0FBdUM7UUFDNUMsYUFBYTtRQUNiLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQyJ9