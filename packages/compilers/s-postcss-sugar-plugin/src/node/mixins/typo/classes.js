import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           classes
 * @namespace      node.mixins.typo
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the typo helper classes like s-typo:h1, s-typo:p, and all the typo
 * elements that are defined in the config.theme.typo configuration stack.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginTypoClassesInterface extends __SInterface {
}
postcssSugarPluginTypoClassesInterface.definition = {};
export { postcssSugarPluginTypoClassesInterface as interface };
export default function ({ params, atRule, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const typosObj = __theme().config('typo');
    Object.keys(typosObj).forEach((typoName) => {
        var _a;
        const typoObj = typosObj[typoName];
        const cls = `s-typo:${typoName}`;
        const css = jsObjectToCssProperties(typoObj, {
            exclude: ['rhythmVertical'],
        });
        vars.push(`/**
            * @name            ${cls}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
            * 
            * @example      html
            * <span class="${cls.replace(':', ':')}">Something cool</span>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        .${cls.replace(':', '--')} {
                ${css}
        }`);
        vars.push(`/**
            * @name            s-format:text ${typoName}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        @sugar.format.text {
            ${typoName} {
                ${css}
            }
        }`);
        vars.push(`/**
            * @name            s-rhythm:vertical .${typoName}, s-rhythm:vertical ${typoName}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @feature          Vertical rhythm
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        @sugar.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${jsObjectToCssProperties((_a = typoObj.rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
        }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLHVCQUF1QixFQUN2QixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7O1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxVQUFVLFFBQVEsRUFBRSxDQUFDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtZQUN6QyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztTQUM5QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO2lDQUNlLEdBQUc7Ozs7Ozs0REFNd0IsUUFBUTs7OzZCQUd2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O1dBS3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztrQkFDZixHQUFHO1VBQ1gsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLElBQUksQ0FBQzsrQ0FDNkIsUUFBUTs7Ozs7OzREQU1LLFFBQVEsc0NBQXNDLFFBQVE7Ozs7bUJBSS9GLFFBQVEsb0JBQW9CLFFBQVE7Ozs7OztjQU16QyxRQUFRO2tCQUNKLEdBQUc7O1VBRVgsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLElBQUksQ0FBQztvREFDa0MsUUFBUSx1QkFBdUIsUUFBUTs7Ozs7OzREQU0vQixRQUFRLHNDQUFzQyxRQUFROzs7Ozs7bUJBTS9GLFFBQVEsb0JBQW9CLFFBQVE7Ozs7OztjQU16QyxRQUFRLE1BQU0sUUFBUTtrQkFDbEIsdUJBQXVCLENBQUMsTUFBQSxPQUFPLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUM7O1VBRTdELENBQUMsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==