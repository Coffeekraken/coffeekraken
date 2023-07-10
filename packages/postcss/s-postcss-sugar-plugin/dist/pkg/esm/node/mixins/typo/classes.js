import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @as              @sugar.typo.classes
 * @namespace      node.mixin.typo
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the typo helper classes like s-typo:h1, s-typo:p, and all the typo
 * elements that are defined in the config.theme.typo configuration stack.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.typo.classes
 *
 * @example        css
 * \@sugar.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const typosObj = __STheme.get('typo');
    vars.comment(() => `
      /**
        * @name          Typo
        * @namespace          sugar.style.helpers.typo
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/typography
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply basic typo styles like \`sub\`, \`strong\`, etc... on any HTMLElement
        * These styles are defined in the \`theme.typo\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.typo.classes;
        * 
        ${Object.keys(typosObj)
        .map((typoName) => {
        return ` * @cssClass            s-typo:${typoName}          Apply the \`${typoName}\` style`;
    })
        .join('\n')}
        * @cssClass             s-format:text           Format automatically child tags like \`strong\` to the \`s-typo:string\` style
        * @cssClass             s-rhythm:vertical           Apply the vertical rhythm to all direct child tags
        *
         ${Object.keys(typosObj)
        .map((typoName) => {
        return ` * @example        html        ${typoName}
            *   <${typoName} class="s-typo:${typoName}">
            *       ${__faker.name.findName()}
            *   </${typoName}>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(typosObj).forEach((typoName) => {
        var _a, _b;
        const typoObj = typosObj[typoName];
        const cls = `s-typo:${typoName}`;
        const css = __STheme.jsObjectToCssProperties((_a = typoObj.style) !== null && _a !== void 0 ? _a : {}, {});
        vars.comment(() => `/**
            * @name            ${cls}
            * @namespace          sugar.style.helpers.typo
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
        .${cls.replace(':', '--')} {
                ${css}
        }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name            s-format:text ${typoName}
            * @namespace          sugar.style.helpers.typo
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
        @sugar.format.text {
            ${typoName} {
                ${css}
            }
        }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name            s-rhythm:vertical .${typoName}, s-rhythm:vertical ${typoName}
            * @namespace          sugar.style.helpers.typo
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
        @sugar.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${__STheme.jsObjectToCssProperties((_b = typoObj.rhythmVertical) !== null && _b !== void 0 ? _b : {})}
            }
        }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFvQkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLGtDQUFrQyxRQUFRLHlCQUF5QixRQUFRLFVBQVUsQ0FBQztJQUNqRyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1dBSVosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLGtDQUFrQyxRQUFRO21CQUMvQyxRQUFRLGtCQUFrQixRQUFRO3NCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDekIsUUFBUTtlQUNiLENBQUM7SUFDSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtuQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBQSxPQUFPLENBQUMsS0FBSyxtQ0FBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztpQ0FDZSxHQUFHOzs7Ozs7NERBTXdCLFFBQVE7Ozs2QkFHdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztTQUt6QyxDQUNBLENBQUMsSUFBSSxDQUNGO1dBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2tCQUNmLEdBQUc7VUFDWCxFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsrQ0FDNkIsUUFBUTs7Ozs7OzREQU1LLFFBQVEsc0NBQXNDLFFBQVE7Ozs7bUJBSS9GLFFBQVEsb0JBQW9CLFFBQVE7Ozs7O1lBSzNDLENBQ0gsQ0FBQyxJQUFJLENBQ0Y7O2NBRUUsUUFBUTtrQkFDSixHQUFHOztVQUVYLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO29EQUNrQyxRQUFRLHVCQUF1QixRQUFROzs7Ozs7NERBTS9CLFFBQVEsc0NBQXNDLFFBQVE7Ozs7OzttQkFNL0YsUUFBUSxvQkFBb0IsUUFBUTs7Ozs7WUFLM0MsQ0FDSCxDQUFDLElBQUksQ0FDRjs7Y0FFRSxRQUFRLE1BQU0sUUFBUTtrQkFDbEIsUUFBUSxDQUFDLHVCQUF1QixDQUM5QixNQUFBLE9BQU8sQ0FBQyxjQUFjLG1DQUFJLEVBQUUsQ0FDL0I7O1VBRVAsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9