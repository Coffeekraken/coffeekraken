import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class SSugarcssPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @as          @s.color.classes
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the colors helpers classes like s-tc:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @snippet         @s.color.classes
 *
 * @example        css
 * @s.color.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith }) {
    const cssArray = new CssVars();

    cssArray.comment(
        () => `
      /**
        * @name          Colors
        * @namespace          sugar.style.helpers.color
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/colors
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to set text and background colors easily to any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.color.classes;
        * 
        * .my-element {
        *   @s.color(accent);
        * }                   
        * 
        ${Object.keys(__STheme.current.baseColors())
            .map((colorName) => {
                return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
            })
            .join('\n')}
        ${Object.keys(__STheme.current.baseColors())
            .map((colorName) => {
                return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
            })
            .join('\n')}
        ${Object.keys(__STheme.current.baseColors())
            .map((colorName) => {
                return ` * @cssClass            s-bc:${colorName}       Apply the ${colorName} background color`;
            })
            .join('\n')}
        *
        * @example        html          Text color
        ${Object.keys(__STheme.current.baseColors())
            .map((colorName) => {
                return ` * <div class="s-tc:${colorName} s-mb:30">${colorName}</div>`;
            })
            .join('\n')}
        *
        * @example        html          Background color
        ${Object.keys(__STheme.current.baseColors())
            .map((colorName) => {
                return ` * <div class="s-bc:${colorName} s-p:10 s-mb:30 s-radius">${colorName}</div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Object.keys(__STheme.current.baseColors()).forEach((colorName) => {
        cssArray
            .comment(
                () => `
      /**
       * @name        s-color:${colorName}
       * @namespace          sugar.style.helpers.color
       * @type          CssClass
       * @status        stable
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
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `,
            )
            .code(
                `
                @s.lod.prevent {
                    .s-color-${colorName} {
                        @s.color(${colorName});
                    }
                }
    `,
                { type: 'CssClass' },
            );

        cssArray
            .comment(() =>
                [
                    `/**`,
                    ` * @name           s-bc:${colorName}`,
                    ` * @namespace          sugar.style.helpers.color`,
                    ` * @type           CssClass`,
                    ` * @platform       css`,
                    ` * @status         stable`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-bc:${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                ].join('\n'),
            )
            .code(
                `
                .s-bc-${colorName} {
                    background-color: s.color(${colorName}) !important;
                }
        `,
                { type: 'CssClass' },
            );
    });

    __STheme.current.loopOnColors((colorObj) => {
        const colorName = colorObj.name;

        if (colorObj.shade) {
            return;
        }

        cssArray
            .comment(() =>
                [
                    `/**`,
                    ` * @name           s-tc:${colorName}`,
                    ` * @namespace          sugar.style.helpers.color`,
                    ` * @type           CssClass`,
                    ` * @platform       css`,
                    ` * @status         stable`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}" text color to an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-tc:${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                ].join('\n'),
            )
            .code(
                `
                .s-tc-${colorName} {
                    color: s.color(${colorName}, text) !important;
                }
        `,
                { type: 'CssClass' },
            );

        cssArray
            .comment(() =>
                [
                    `/**`,
                    ` * @name           s-bc:${colorName}`,
                    ` * @namespace          sugar.style.helpers.color`,
                    ` * @type           CssClass`,
                    ` * @platform       css`,
                    ` * @status         stable`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-bc:${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                ].join('\n'),
            )
            .code(
                `
                .s-bc-${colorName} {
                    background-color: s.color(${colorName}) !important;
                }
        `,
                { type: 'CssClass' },
            );
    });

    cssArray
        .comment(() =>
            [
                `/**`,
                ` * @name           s-bc:odd`,
                ` * @namespace          sugar.style.helpers.color`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         stable`,
                ` *`,
                ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <ol class="s-bc:odd">`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` * </li>`,
                ` */`,
            ].join('\n'),
        )
        .code(
            `
            .s-bc-odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `,
            { type: 'CssClass' },
        );
    cssArray
        .comment(() =>
            [
                `/**`,
                ` * @name           s-bc:even`,
                ` * @namespace          sugar.style.helpers.color`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         stable`,
                ` *`,
                ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <ol class="s-bc:even">`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` *     <li class="s-bc-accent">Something cool</li>`,
                ` * </li>`,
                ` */`,
            ].join('\n'),
        )
        .code(
            `
        .s-bc-even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `,
            { type: 'CssClass' },
        );

    replaceWith(cssArray);
}
