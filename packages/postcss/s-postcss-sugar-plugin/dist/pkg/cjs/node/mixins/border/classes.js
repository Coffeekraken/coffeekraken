"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
class postcssSugarPluginBorderRadiusClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginBorderRadiusClassesMixinInterface;
/**
 * @name          classes
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the borders helpers like s-radius:20, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @sugar.border.classes;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const radiusesObj = s_theme_1.default.get('border.radius');
    const radiusesKeys = (0, array_1.__keysFirst)(Object.keys(radiusesObj), ['default']);
    const widthsObj = s_theme_1.default.get('border.width');
    const widthsKeys = (0, array_1.__keysFirst)(Object.keys(widthsObj), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Radius
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/radius
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply border radius on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        * @cssClass             s-radius            Apply the default border radius to any HTMLElement
        ${radiusesKeys
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return ` * @cssClass      s-radius:${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example        html          Border radius
        ${radiusesKeys
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return `
              *   <div class="s-radius:${radiusName} s-display:inline-block s-width:20 s-bg:main s-pbs:30 s-mie:30 s-mbe:30 s-text:center s-ratio:1">
              *     ${radiusName}
              *   </div> 
            `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Border width
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-width
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border width to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${widthsKeys
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return ` * @cssClass      s-bwidth:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border width
        ${widthsKeys
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return `   <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:accent s-bwidth:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Border color
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-color
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border color to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        if (colorName === 'default')
            return '';
        return ` * @cssClass      s-bcolor:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border color
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:${colorName} s-bwidth:20">
              *     ${colorName}
              *   </div> 
            `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    radiusesKeys.forEach((radiusName) => {
        const cls = `s-radius--${radiusName}`.replace('--default', '');
        const clsName = `s-radius:${radiusName}`.replace(':default', '');
        const radiusCss = `/**
            * @name               ${clsName}
            * @namespace          sugar.style.border
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
            * 
            * @example        html
            * <div class="${clsName.replace(':', ':')} s-color--complementary">
            *     Hello world
            * </div>
            */
 `;
        vars.comment(() => radiusCss).code(`
            .${cls} {
                @sugar.border.radius(${radiusName});
            }
        `, { type: 'CssClass' });
    });
    widthsKeys.forEach((widthName) => {
        const cls = `s-bwidth:${widthName}`.replace(':default', '');
        const clsName = `s-bwidth--${widthName}`.replace('--default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${widthName}</yellow>" border width style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            @sugar.border.width(${widthName});
        }`, { type: 'CssClass' });
    });
    Object.keys(s_theme_1.default.getTheme().baseColors()).forEach((colorName) => {
        const cls = `s-bcolor:${colorName}`.replace(':default', '');
        const clsName = `s-bcolor--${colorName}`.replace('--default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${colorName}</yellow>" border color style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            border-color: sugar.color(${colorName});
        }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhELE1BQU0sbURBQW9ELFNBQVEscUJBQVk7SUFDMUUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJK0Qsd0VBQVM7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sU0FBUyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sVUFBVSxHQUFHLElBQUEsbUJBQVcsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVwRSxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLFlBQVk7U0FDVCxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNoQixJQUFJLFVBQVUsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDeEMsT0FBTyw4QkFBOEIsVUFBVSxpQ0FBaUMsVUFBVSxxQkFBcUIsQ0FBQztJQUNwSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDaEIsSUFBSSxVQUFVLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLE9BQU87eUNBQ2tCLFVBQVU7c0JBQzdCLFVBQVU7O2FBRW5CLENBQUM7SUFDRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLFVBQVU7U0FDUCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPLDhCQUE4QixTQUFTLGdDQUFnQyxTQUFTLHFCQUFxQixDQUFDO0lBQ2pILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7OztVQUdiLFVBQVU7U0FDUCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPLGdJQUFnSSxTQUFTO3NCQUMxSSxTQUFTOzthQUVsQixDQUFDO0lBQ0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCSixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTyw4QkFBOEIsU0FBUyxnQ0FBZ0MsU0FBUyxxQkFBcUIsQ0FBQztJQUNqSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLGdIQUFnSCxTQUFTO3NCQUMxSCxTQUFTOzthQUVsQixDQUFDO0lBQ0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLGFBQWEsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxNQUFNLE9BQU8sR0FBRyxZQUFZLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsTUFBTSxTQUFTLEdBQUc7b0NBQ1UsT0FBTzs7Ozs7OzBEQU1lLFVBQVU7Ozs0QkFHeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7O0VBSW5ELENBQUM7UUFDSyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDOUI7ZUFDRyxHQUFHO3VDQUNxQixVQUFVOztTQUV4QyxFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxHQUFHLEdBQUcsWUFBWSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sT0FBTyxHQUFHLGFBQWEsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3dDQUNzQixHQUFHOzs7Ozs7OERBTW1CLFNBQVM7OztnQ0FHdkMsR0FBRzs7OztTQUkxQixDQUNBLENBQUMsSUFBSSxDQUNGO1dBQ0QsT0FBTztrQ0FDZ0IsU0FBUztVQUNqQyxFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxZQUFZLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxPQUFPLEdBQUcsYUFBYSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7d0NBQ3NCLEdBQUc7Ozs7Ozs4REFNbUIsU0FBUzs7O2dDQUd2QyxHQUFHOzs7O1NBSTFCLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7V0FDRCxPQUFPO3dDQUNzQixTQUFTO1VBQ3ZDLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF0T0QsNEJBc09DIn0=