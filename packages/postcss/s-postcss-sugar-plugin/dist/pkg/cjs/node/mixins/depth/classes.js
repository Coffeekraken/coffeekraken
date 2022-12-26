"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
/**
 * @name           classes
 * @namespace      node.mixin.depth
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the depth helper classes like s-depth:20, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example        css
 * @sugar.depth.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDepthClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginDepthClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const depthsObj = s_theme_1.default.get('depth');
    const depthsArray = (0, array_1.__keysFirst)(Object.keys(depthsObj), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Depth
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.depth.classes;
        * 
        * .my-element {
        *   \\@sugar.depth(100);
        * }          
        * 
        ${depthsArray
        .map((depthName) => {
        return [
            ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
        ].join('\n');
    })
        .join('\n')}
        *
        ${depthsArray
        .map((depthName) => {
        return ` * @example          html        Depth ${depthName}
                <div class="s-depth:${depthName} s-bg:main-surface s-width:40 s-ratio:16-9 s-text:center s-radius s-p:30 @tablet s-width:60 @mobile s-width:100">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}</span>
                </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.style.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--accent s-depth:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth${depthName === 'default' ? '' : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`, { type: 'CssClass' });
    });
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:text:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.style.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--accent s-depth:text:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth--text.s-depth${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUltRCw0REFBUztBQUU3RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsTUFBTSxXQUFXLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBd0JKLFdBQVc7U0FDUixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU87WUFDSCxpQ0FBaUMsU0FBUyx5QkFBeUIsU0FBUyxxQkFBcUI7WUFDakcsc0NBQXNDLFNBQVMsOEJBQThCLFNBQVMscUJBQXFCO1lBQzNHLHFDQUFxQyxTQUFTLHlCQUF5QixTQUFTLHFCQUFxQjtTQUN4RyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFdBQVc7U0FDUixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sMENBQTBDLFNBQVM7c0NBQ3BDLFNBQVM7Z0RBQ0MsU0FBUyxhQUFhLFNBQVM7dUJBQ3hELENBQUM7SUFDWixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsyQ0FFRSxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQ25DOzs7Ozs7OERBTThDLFNBQVM7OzswREFJbkQsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUNuQzs7aUJBRUMsQ0FDUixDQUFDLElBQUksQ0FDRjtVQUNGLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7eUJBQ2hDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3BELFNBQVM7RUFDM0IsRUFDVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Z0RBRUUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUNuQzs7Ozs7OzhEQU04QyxTQUFTOzs7K0RBSW5ELFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FDbkM7O2lCQUVDLENBQ1IsQ0FBQyxJQUFJLENBQ0Y7d0JBQ1ksU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTttQkFDcEQsU0FBUztFQUMxQixFQUNVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaElELDRCQWdJQyJ9