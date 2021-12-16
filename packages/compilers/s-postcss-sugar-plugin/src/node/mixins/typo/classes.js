import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.typo
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginTypoClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const typosObj = __STheme.config('typo');
    vars.comment(() => `
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
        const css = __STheme.jsObjectToCssProperties(typoObj, {
            exclude: ['rhythmVertical'],
        });
        vars.comment(() => `/**
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
        `).code(`
        .${cls.replace(':', '--')} {
                ${css}
        }`);
        vars.comment(() => `/**
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
           `).code(`
        @sugar.format.text {
            ${typoName} {
                ${css}
            }
        }`);
        vars.comment(() => `/**
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
           `).code(`
        @sugar.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${__STheme.jsObjectToCssProperties((_a = typoObj.rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
        }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNkLE9BQU8sa0NBQWtDLFFBQVEseUJBQXlCLFFBQVEsVUFBVSxDQUFDO0lBQ2pHLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O1dBS1osTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLFdBQVcsUUFBUTs7NkRBRWtCLFFBQVE7bUJBQ2xELFFBQVEsa0JBQWtCLFFBQVE7c0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN6QixRQUFROztlQUViLENBQUM7SUFDSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtuQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFO1lBQ2xELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQzlCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7aUNBQ2UsR0FBRzs7Ozs7OzREQU13QixRQUFROzs7NkJBR3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7U0FLekMsQ0FDQSxDQUFDLElBQUksQ0FBQztXQUNKLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztrQkFDZixHQUFHO1VBQ1gsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsrQ0FDNkIsUUFBUTs7Ozs7OzREQU1LLFFBQVEsc0NBQXNDLFFBQVE7Ozs7bUJBSS9GLFFBQVEsb0JBQW9CLFFBQVE7Ozs7O1lBSzNDLENBQ0gsQ0FBQyxJQUFJLENBQUM7O2NBRUQsUUFBUTtrQkFDSixHQUFHOztVQUVYLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7b0RBQ2tDLFFBQVEsdUJBQXVCLFFBQVE7Ozs7Ozs0REFNL0IsUUFBUSxzQ0FBc0MsUUFBUTs7Ozs7O21CQU0vRixRQUFRLG9CQUFvQixRQUFROzs7OztZQUszQyxDQUNILENBQUMsSUFBSSxDQUFDOztjQUVELFFBQVEsTUFBTSxRQUFRO2tCQUNsQixRQUFRLENBQUMsdUJBQXVCLENBQzlCLE1BQUEsT0FBTyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUMvQjs7VUFFUCxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==