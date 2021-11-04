import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const typosObj = __STheme.config('typo');
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
        const css = __STheme.jsObjectToCssProperties(typoObj, {
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
                ${__STheme.jsObjectToCssProperties((_a = typoObj.rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
        }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDdEQsaURBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNkLE9BQU8sa0NBQWtDLFFBQVEseUJBQXlCLFFBQVEsVUFBVSxDQUFDO0lBQ2pHLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O1dBS1osTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLFdBQVcsUUFBUTs7NkRBRWtCLFFBQVE7bUJBQ2xELFFBQVEsa0JBQWtCLFFBQVE7c0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN6QixRQUFROztlQUViLENBQUM7SUFDSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtuQixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFO1lBQ2xELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQzlCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUM7aUNBQ2UsR0FBRzs7Ozs7OzREQU13QixRQUFROzs7NkJBR3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7V0FLdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2tCQUNmLEdBQUc7VUFDWCxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDOytDQUM2QixRQUFROzs7Ozs7NERBTUssUUFBUSxzQ0FBc0MsUUFBUTs7OzttQkFJL0YsUUFBUSxvQkFBb0IsUUFBUTs7Ozs7O2NBTXpDLFFBQVE7a0JBQ0osR0FBRzs7VUFFWCxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDO29EQUNrQyxRQUFRLHVCQUF1QixRQUFROzs7Ozs7NERBTS9CLFFBQVEsc0NBQXNDLFFBQVE7Ozs7OzttQkFNL0YsUUFBUSxvQkFBb0IsUUFBUTs7Ozs7O2NBTXpDLFFBQVEsTUFBTSxRQUFRO2tCQUNsQixRQUFRLENBQUMsdUJBQXVCLENBQzlCLE1BQUEsT0FBTyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUMvQjs7VUFFUCxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=