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

    cssArray.comment(
        () => `
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
    `,
    );

    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
        cssArray.comment(
            () => `
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
      `,
        ).code(`
      .s-color--${colorName} {
        @sugar.color(${colorName});
      }
    `);
    });

    __STheme.getTheme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant) modifierStr = `-${colorObj.variant}`;

        cssArray.comment(() =>
            [
                `/**`,
                ` * @name           s-tc:${colorName}${
                    colorObj.variant === 'text' ? '' : modifierStr
                }`,
                ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" text color to an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-tc\:${colorName}${
                    colorObj.variant === 'text' ? '' : modifierStr
                }">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
            ].join('\n'),
        ).code(`
            .s-tc--${colorName}${
            colorObj.variant === 'text' ? '' : modifierStr
        } {
            color: sugar.color(${colorName}, ${colorObj.variant});
        }
        `);

        cssArray.comment(() =>
            [
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
            ].join('\n'),
        ).code(`
            .s-bg--${colorName}${modifierStr} {
                   background-color: sugar.color(${colorName}, ${colorObj.variant});
                }
        `);
    });

    cssArray.comment(() =>
        [
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
        ].join('\n'),
    ).code(`
        .s-bg--odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `);
    cssArray.comment(() =>
        [
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
        ].join('\n'),
    ).code(`
        .s-bg--even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `);

    replaceWith(cssArray);
}
