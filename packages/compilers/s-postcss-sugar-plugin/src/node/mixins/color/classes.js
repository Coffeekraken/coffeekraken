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
 * @platform      css
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
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [];
    cssArray.push(`
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
        cssArray.push(`
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
      .s-color--${colorName} {
        @sugar.color(${colorName});
      }
    `);
    });
    __STheme.getTheme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant)
            modifierStr = `-${colorObj.variant}`;
        cssArray.push([
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
            `.s-tc--${colorName}${colorObj.variant === 'text' ? '' : modifierStr} {`,
            `   color: sugar.color(${colorName}, ${colorObj.variant});`,
            `}`,
        ].join('\n'));
        cssArray.push([
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
            `.s-bg--${colorName}${modifierStr} {`,
            `   background-color: sugar.color(${colorName}, ${colorObj.variant})`,
            `}`,
        ].join('\n'));
    });
    cssArray.push([
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
        `.s-bg--odd > *:nth-child(even) {`,
        '   background-color: transparent !important;',
        `}`,
    ].join('\n'));
    cssArray.push([
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
        `.s-bg--even > *:nth-child(even) {`,
        '   background-color: transparent !important;',
        `}`,
    ].join('\n'));
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUNwRCxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsUUFBUSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCUixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMxQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sbUNBQW1DLFNBQVMsb0JBQW9CLFNBQVMsZ0NBQWdDLENBQUM7SUFDckgsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxnQ0FBZ0MsU0FBUyxvQkFBb0IsU0FBUyxhQUFhLENBQUM7SUFDL0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxD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