import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };
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
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const radiusesObj = __STheme.get('border.radius');
    const radiusesKeys = __keysFirst(Object.keys(radiusesObj), ['default']);
    const widthsObj = __STheme.get('border.width');
    const widthsKeys = __keysFirst(Object.keys(widthsObj), ['default']);
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
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        if (colorName === 'default')
            return '';
        return ` * @cssClass      s-bcolor:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border color
        ${Object.keys(__STheme.getTheme().baseColors())
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
    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RCxNQUFNLG1EQUFvRCxTQUFRLFlBQVk7SUFDMUUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsbURBQW1ELElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0MsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFpQkosWUFBWTtTQUNULEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFF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