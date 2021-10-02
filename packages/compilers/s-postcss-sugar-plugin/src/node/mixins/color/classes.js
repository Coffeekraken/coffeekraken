import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
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
        ${Object.keys(__theme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
    })
        .join('\n')}
        ${Object.keys(__theme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
    })
        .join('\n')}
        ${Object.keys(__theme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-bg:${colorName}       Apply the ${colorName} background color`;
    })
        .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text color</h3>
        ${Object.keys(__theme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-tc:${colorName} s-mb:20">${colorName}: ${__faker.name.findName()}</div>`;
    })
        .join('\n')}
        * </div>
        *
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Background color</h3>
        ${Object.keys(__theme().baseColors())
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
    Object.keys(__theme().baseColors()).forEach((colorName) => {
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
    __theme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant)
            modifierStr = `-${colorObj.variant}`;
        cssArray.push([
            `/**`,
            ` * @name           s-tc:${colorName}${modifierStr}`,
            ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" text color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-tc\:${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-tc--${colorName}${modifierStr} {`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTs7QUFDdkQsa0RBQVUsR0FBRyxFQUFFLENBQUM7QUFFM0IsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO0lBQ3BELE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixRQUFRLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDaEMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLG1DQUFtQyxTQUFTLG9CQUFvQixTQUFTLGdDQUFnQyxDQUFDO0lBQ3JILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7VUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ2hDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxnQ0FBZ0MsU0FBUyxvQkFBb0IsU0FBUyxhQUFhLENBQUM7SUFDL0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDaEMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFD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