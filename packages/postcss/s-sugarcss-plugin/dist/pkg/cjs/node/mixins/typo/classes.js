"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @s.typo.classes
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
 * @snippet         @s.typo.classes
 *
 * @example        css
 * @s.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginTypoClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginTypoClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const typosObj = s_theme_1.default.get('typo');
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
        * @s.typo.classes;
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
            *       ${faker_1.default.name.findName()}
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
        const css = s_theme_1.default.jsObjectToCssProperties((_a = typoObj.style) !== null && _a !== void 0 ? _a : {}, {});
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
        .${cls.replace(':', '-')} {
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
        @s.format.text {
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
        @s.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${s_theme_1.default.jsObjectToCssProperties((_b = typoObj.rhythmVertical) !== null && _b !== void 0 ? _b : {})}
            }
        }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxRQUFRLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFvQkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLGtDQUFrQyxRQUFRLHlCQUF5QixRQUFRLFVBQVUsQ0FBQztJQUNqRyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1dBSVosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLGtDQUFrQyxRQUFRO21CQUMvQyxRQUFRLGtCQUFrQixRQUFRO3NCQUMvQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDekIsUUFBUTtlQUNiLENBQUM7SUFDSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtuQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxpQkFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQUEsT0FBTyxDQUFDLEtBQUssbUNBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7aUNBQ2UsR0FBRzs7Ozs7OzREQU13QixRQUFROzs7NkJBR3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7U0FLekMsQ0FDQSxDQUFDLElBQUksQ0FDRjtXQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztrQkFDZCxHQUFHO1VBQ1gsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLFFBQVE7Ozs7Ozs0REFNSyxRQUFRLHNDQUFzQyxRQUFROzs7O21CQUkvRixRQUFRLG9CQUFvQixRQUFROzs7OztZQUszQyxDQUNILENBQUMsSUFBSSxDQUNGOztjQUVFLFFBQVE7a0JBQ0osR0FBRzs7VUFFWCxFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztvREFDa0MsUUFBUSx1QkFBdUIsUUFBUTs7Ozs7OzREQU0vQixRQUFRLHNDQUFzQyxRQUFROzs7Ozs7bUJBTS9GLFFBQVEsb0JBQW9CLFFBQVE7Ozs7O1lBSzNDLENBQ0gsQ0FBQyxJQUFJLENBQ0Y7O2NBRUUsUUFBUSxNQUFNLFFBQVE7a0JBQ2xCLGlCQUFRLENBQUMsdUJBQXVCLENBQzlCLE1BQUEsT0FBTyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUMvQjs7VUFFUCxFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN0pELDRCQTZKQyJ9