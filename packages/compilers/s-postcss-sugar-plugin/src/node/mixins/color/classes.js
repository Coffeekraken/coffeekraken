import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the colors helpers classes like s-tc:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @example         postcss
 * \@sugar.color;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, CssVars, replaceWith }) {
    const cssArray = new CssVars();
    cssArray.comment(() => `
      /**
        * @name          Colors
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/colors
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to set text and background colors easily to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-bg:${colorName}       Apply the ${colorName} background color`;
    })
        .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text color</h3>
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-tc:${colorName} s-mb:20">${colorName}: ${__faker.name.findName()}</div>`;
    })
        .join('\n')}
        * </div>
        *
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Background color</h3>
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-bg:${colorName} s-p:10 s-mb:20">${colorName}: ${__faker.name.findName()}</div>`;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
        cssArray.comment(() => `
      /**
       * @name        s-color:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color:${colorName}">${colorName}</span>" text color to any ui element.
       * This does apply the color only on the item itself and not on his childs...
       * 
       * @example       html
       * <label>
       *   Hello world
       *   <input type="text" class="s-input s-color:${colorName}" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
      .s-color--${colorName} {
        @sugar.color(${colorName});
      }
    `);
        cssArray.comment(() => [
            `/**`,
            ` * @name           s-bg:${colorName}`,
            ` * @namespace      sugar.css.color.bg.${colorName}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bg\:${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n')).code(`
            .s-bg--${colorName} {
                   background-color: sugar.color(${colorName});
                }
        `);
    });
    __STheme.getTheme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant)
            modifierStr = `-${colorObj.variant}`;
        cssArray.comment(() => [
            `/**`,
            ` * @name           s-tc:${colorName}${colorObj.variant === 'text' ? '' : modifierStr}`,
            ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" text color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-tc\:${colorName}${colorObj.variant === 'text' ? '' : modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n')).code(`
            .s-tc--${colorName}${colorObj.variant === 'text' ? '' : modifierStr} {
            color: sugar.color(${colorName}, ${colorObj.variant});
        }
        `);
        cssArray.comment(() => [
            `/**`,
            ` * @name           s-bg:${colorName}${modifierStr}`,
            ` * @namespace      sugar.css.color.bg.${colorName}.${colorObj.variant}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bg\:${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n')).code(`
            .s-bg--${colorName}${modifierStr} {
                   background-color: sugar.color(${colorName}, ${colorObj.variant});
                }
        `);
    });
    cssArray.comment(() => [
        `/**`,
        ` * @name           s-bg:odd`,
        ` * @namespace      sugar.css.bg.classes`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg\:odd">`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n')).code(`
        .s-bg--odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `);
    cssArray.comment(() => [
        `/**`,
        ` * @name           s-bg:even`,
        ` * @namespace      sugar.css.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg\:even">`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n')).code(`
        .s-bg--even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `);
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDN0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUvQixRQUFRLENBQUMsT0FBTyxDQUNaLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxtQ0FBbUMsU0FBUyxvQkFBb0IsU0FBUyxnQ0FBZ0MsQ0FBQztJQUNySCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLGdDQUFnQyxTQUFTLG9CQUFvQixTQUFTLGFBQWEsQ0FBQztJQUMvRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsTUFBTSxD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