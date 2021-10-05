import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';
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
    vars.push(`
      /**
        * @name          Typography
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/typography
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply basic typo styles like \`sub\`, \`strong\`, etc... on any HTMLElement
        * These styles are defined in the \`theme.typo\` theme settings.
        * 
        * @support      chromium        14+
        * @support      firefox         68+    
        * @support      safari          5+
        * @support      edge            17+
        * 
        ${Object.keys(typosObj)
        .map((typoName) => {
        return ` * @cssClass            s-typo:${typoName}          Apply the \`${typoName}\` style`;
    })
        .join('\n')}
        * @cssClass             s-format:text           Format automatically child tags like \`strong\` to the \`s-typo:string\` style
        * @cssClass             s-rhythm:vertical           Apply the vertical rhythm to all direct child tags
        *
        * @example        html
         ${Object.keys(typosObj)
        .map((typoName) => {
        return ` * <!-- ${typoName} -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${typoName}</h3>
            *   <${typoName} class="s-typo:${typoName}">
            *       ${__faker.name.findName()}
            *   </${typoName}>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDdEQsaURBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNkLE9BQU8sa0NBQWtDLFFBQVEseUJBQXlCLFFBQVEsVUFBVSxDQUFDO0lBQ2pHLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O1dBS1osTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLFdBQVcsUUFBUTs7NkRBRWtCLFFBQVE7bUJBQ2xELFFBQVEsa0JBQWtCLFFBQVE7c0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN6QixRQUFROztlQUViLENBQUM7SUFDSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtuQixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7WUFDekMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQztpQ0FDZSxHQUFHOzs7Ozs7NERBTXdCLFFBQVE7Ozs2QkFHdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztXQUt2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7a0JBQ2YsR0FBRztVQUNYLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJLENBQUM7K0NBQzZCLFFBQVE7Ozs7Ozs0REFNSyxRQUFRLHNDQUFzQyxRQUFROzs7O21CQUkvRixRQUFRLG9CQUFvQixRQUFROzs7Ozs7Y0FNekMsUUFBUTtrQkFDSixHQUFHOztVQUVYLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJLENBQUM7b0RBQ2tDLFFBQVEsdUJBQXVCLFFBQVE7Ozs7Ozs0REFNL0IsUUFBUSxzQ0FBc0MsUUFBUTs7Ozs7O21CQU0vRixRQUFRLG9CQUFvQixRQUFROzs7Ozs7Y0FNekMsUUFBUSxNQUFNLFFBQVE7a0JBQ2xCLHVCQUF1QixDQUFDLE1BQUEsT0FBTyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDOztVQUU3RCxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=